import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { createSearchParams, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { deleteEmpresa, getEmpresas, putEmpresa } from "../services/EmpresasService";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AtualizarEmpresa from "../components/AtualizarEmpresa";
import ConfirmarDelete from "../components/ConfirmarDelete";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';


export default function Empresas() {
    const navegar = useNavigate();
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [empresaParaAtualizar, setEmpresaParaAtualizar] = useState<Empresa>();
    const [openEmpresaAtualizar, setOpenEmpresaAtualizar] = useState<boolean>(false);
    const [empresaParaDeletar, setEmpresaParaDeletar] = useState<Empresa>();
    const [openEmpresaDeletar, setOpenEmpresaDeletar] = useState<boolean>(false);

    useEffect(() => {
        const buscaData = async () => {
            try {
                const empresas = await getEmpresas();
                setEmpresas(empresas)
            } catch (error) {
                console.log("Erro ao buscar empresas:", error);
            }
        };
        buscaData();
    }, [openEmpresaAtualizar, openEmpresaDeletar]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function handleOpenAtualizaEmpresa(empresa: Empresa) {
        setEmpresaParaAtualizar(empresa);
        setOpenEmpresaAtualizar(true);
    }

    async function handleAtualizaEmpresa(empresa: EmpresaPayload) {
        handleCloseAtualizaEmpresa();
        try {
            if (empresaParaAtualizar?.id) {
                await putEmpresa(empresaParaAtualizar?.id, empresa);
            }
        } catch (error) {
            console.log("Erro ao atualizar empresa:", error);
        }
    }

    function handleOpenDeleteEmpresa(empresa: Empresa) {
        setEmpresaParaDeletar(empresa);
        setOpenEmpresaDeletar(true);
    }

    async function handleDeleteEmpresa(id: number) {
        handleCloseDeleteEmpresa();
        try {
            if (empresaParaDeletar) {
                await deleteEmpresa(id);
            }
        } catch (error) {
            console.log("Erro ao deletar empresa:", error);
        }
    }

    async function handleCloseDeleteEmpresa() {
        setOpenEmpresaDeletar(false);
    }

    async function handleCloseAtualizaEmpresa() {
        setOpenEmpresaAtualizar(false);
    }

    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#ffffff" }}>Lista de Empresas</h2>
                        </Col>
                    </Paper>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Nome</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>CNPJ</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>E-mail</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Sala</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Telefone</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Responsável</StyledTableCell>
                                    <StyledTableCell align="center" style={{ backgroundColor: "#ffffff", color: "#000000" }}>Ações</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empresas.map((empresa) => (
                                    <StyledTableRow key={empresa.id}>
                                        <StyledTableCell>{empresa.nome}</StyledTableCell>
                                        <StyledTableCell>{empresa.cnpj}</StyledTableCell>
                                        <StyledTableCell>{empresa.email}</StyledTableCell>
                                        <StyledTableCell>{empresa.sala}</StyledTableCell>
                                        <StyledTableCell>{empresa.telefone}</StyledTableCell>
                                        <StyledTableCell>{empresa.responsavel_pelo_cadastro}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                className="m-1"
                                                style={{ backgroundColor: "#189995", border: "none" }}
                                                onClick={() => navegar({
                                                    pathname: "/atualizarEmpresa",
                                                    search: createSearchParams({
                                                        id: empresa.id.toString()
                                                    }).toString()
                                                })}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                className="m-1"
                                                style={{ backgroundColor: "#189995", border: "none" }}
                                                onClick={() => handleOpenDeleteEmpresa(empresa)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                            <Button
                                                className="m-1"
                                                style={{ backgroundColor: "#189995", border: "none" }}
                                                onClick={() =>
                                                    navegar({
                                                        pathname: "/eventosEmpresa",
                                                        search: createSearchParams({
                                                            id: empresa.id.toString(),
                                                        }).toString(),
                                                    })
                                                }
                                            >
                                                <EventIcon />
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Button
                        className="mt-3"
                        style={{ backgroundColor: "#189995", border: "none" }}
                        onClick={() => {
                            navegar({ pathname: "/novaEmpresa" });
                        }}
                    >
                        <AddIcon sx={{ fontSize: "large" }} /> Nova Empresa
                    </Button>
                </Col>
            </Row>

            <AtualizarEmpresa
                open={openEmpresaAtualizar}
                onClose={handleCloseAtualizaEmpresa}
                empresa={empresaParaAtualizar}
                onSubmitValue={(empresa: EmpresaPayload) => handleAtualizaEmpresa(empresa)}
                title="Atualizar Empresa"
            />
            <ConfirmarDelete
                title="Deletar Empresa"
                id={empresaParaDeletar?.id}
                open={openEmpresaDeletar}
                onClose={handleCloseDeleteEmpresa}
                onSubmitValue={(id: number) => handleDeleteEmpresa(id)}
            />
        </>
    );
}
