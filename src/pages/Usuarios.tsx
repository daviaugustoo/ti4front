import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { createSearchParams, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { deleteUsuario, getUsuarios, putUsuario } from "../services/UsuariosService";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ConfirmarDelete from "../components/ConfirmarDelete";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';


export default function Usuarios() {
    const navegar = useNavigate();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuarioParaAtualiar, setUsuarioParaAtualizar] = useState<Usuario>();
    const [usuarioParaDeletar, setUsuarioParaDeletar] = useState<Usuario>();
    const [openUsuarioDeletar, setOpenUsuarioDeletar] = useState<boolean>(false);

    useEffect(() => {
        const buscaData = async () => {
            try {
                const Usuarios = await getUsuarios();
                setUsuarios(Usuarios)
            }
            catch (error) {
                console.log("Erro ao buscar Usuarios:", error);
            }
        };
        buscaData();
    }, [openUsuarioDeletar]);


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
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function handleOpenDeleteUsuario(Usuario: Usuario) {
        setUsuarioParaDeletar(Usuario);
        setOpenUsuarioDeletar(true);
    }

    async function handleDeleteUsuario(id: number) {
        handleCloseDeleteUsuario();
        try {
            if (usuarioParaDeletar) {
                await deleteUsuario(id);
            }
        } catch (error) {
            console.log("Erro ao deletar Usuario:", error);
        }
    }

    async function handleCloseDeleteUsuario() {
        setOpenUsuarioDeletar(false);
    }


    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#ffffff" }}>Lista de Usuarios</h2>
                        </Col>
                    </Paper>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Nome</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Email</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Telefone</StyledTableCell>
                                    <StyledTableCell align="center" style={{ backgroundColor: "#ffffff", color: "#000000" }}>Ações</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map((Usuario) => (
                                    <StyledTableRow key={Usuario.id}>
                                        <StyledTableCell>{Usuario.nome}</StyledTableCell>
                                        <StyledTableCell>{Usuario.email}</StyledTableCell>
                                        <StyledTableCell>{Usuario.telefone}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            
                                            <Button
                                                className="m-1"
                                                style={{ backgroundColor: "#189995", border: "none" }}
                                                onClick={() => handleOpenDeleteUsuario(Usuario)}
                                            >
                                                <DeleteIcon />
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
                            navegar({
                                pathname: "/novoUsuario",
                            });
                        }}
                    >
                        <AddIcon sx={{ fontSize: "large" }} /> Novo Usuario
                    </Button>
                </Col>
            </Row>
            <ConfirmarDelete
                title="Deletar Usuario"
                id={usuarioParaDeletar?.id}
                open={openUsuarioDeletar}
                onClose={handleCloseDeleteUsuario}
                onSubmitValue={(id: number) => handleDeleteUsuario(id)}
            />
        </>
    );
}