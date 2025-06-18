
import { Col, FormLabel, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CardEvento from "../components/CardEvento";
import logo from "../imgs/icone_bhtec.jpg"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams, createSearchParams, Form } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AtualizarEvento from "../components/AtualizarEvento";
import ConfirmarDelete from "../components/ConfirmarDelete";
import { getEventosPorDataEIdEmpresa, deleteEvento } from "../services/EventosService";
import { getEmpresa } from "../services/EmpresasService";
import eventoFoto from "../imgs/Evento-Corporativo.jpg"
import RecyclingIcon from '@mui/icons-material/Recycling';
import Moment from 'moment';
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


export default function EventosEmpresa() {
    const navegar = useNavigate();
    const empresaId = Number(useSearchParams()[0].get("id") as string);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [empresa, setEmpresa] = useState<Empresa>()
    const [eventoParaDeletar, setEventoParaDeletar] = useState<Evento>();
    const [openEventoDeletar, setOpenEventoDeletar] = useState<boolean>(false);
    const [filtro, setFiltro] = useState("");

    // Filtros de mês e ano
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const currentYear = currentDate.getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const anosDisponiveis = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

    useEffect(() => {
        const buscaData = async () => {
            try {
                const eventos = await getEventosPorDataEIdEmpresa(empresaId, selectedMonth, selectedYear);
                setEventos(eventos);
            } catch (error) {
                console.log("Erro ao buscar eventos:", error);
            }
            try {
                const empresa = await getEmpresa(empresaId);
                setEmpresa(empresa);
            } catch (error) {
                console.log("Erro ao buscar empresa:", error);
            }
        };
        buscaData();
    }, [selectedMonth, selectedYear]);

    function handleOpenDeleteEvento(evento: Evento) {
        setEventoParaDeletar(evento);
        setOpenEventoDeletar(true);
    }

    async function handleDeleteEvento(id: number) {
        try {
            if (eventoParaDeletar) {
                await deleteEvento(id);
                const eventosAtualizados = await getEventosPorDataEIdEmpresa(empresaId, selectedMonth, selectedYear);
                setEventos(eventosAtualizados);
            }
        } catch (error) {
            console.log("Erro ao deletar evento:", error);
        }
        handleCloseDeleteEvento();
    }

    function handleCloseDeleteEvento() {
        setOpenEventoDeletar(false);
    }

    function mostraOrganizador(evento: Evento) {
        if (evento.organizador) {
            return evento.organizador;
        } else {
            return empresa?.nome;
        }
    }

    // Filtrar eventos pelo nome
    const eventosFiltrados = eventos.filter(evento =>
        evento.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#ffffff" }}>Lista de Eventos</h2>
                        </Col>
                    </Paper>
                    <Paper className="p-2 mb-2 mt-2 ">
                        <Row className="align-items-center g-2">
                            {/* Campo de busca */}
                            <Col md={6}>

                                <TextField
                                    label="Pesquisar evento"
                                    variant="outlined"
                                    fullWidth
                                    value={filtro}
                                    size="small"
                                    onChange={(e) => setFiltro(e.target.value)}
                                />
                            </Col>

                            {/* Filtro de mês */}
                            <Col md={2} className="justify-content-end text-end">
                                <FormControl fullWidth>
                                    <InputLabel id="mes-label">Mês</InputLabel>
                                    <Select
                                        size="small"
                                        labelId="mes-label"
                                        label="Mês"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                    >
                                        {[
                                            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
                                        ].map((mes, index) => (
                                            <MenuItem key={index + 1} value={index + 1}>
                                                {mes}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>

                            {/* Filtro de ano */}
                            <Col md={1} className="justify-content-end text-end">
                                <FormControl fullWidth>
                                    <InputLabel id="ano-label">Ano</InputLabel  >
                                    <Select
                                        label="Ano"
                                        size="small"
                                        labelId="ano-label"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    >
                                        {anosDisponiveis.map((ano) => (
                                            <MenuItem key={ano} value={ano}>
                                                {ano}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>

                            {/* Botão de cadastro */}
                            <Col md={3} className="text-end justify-content-end">
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "#189995" }}
                                    onClick={() => navegar({ pathname: "/novoEvento" })}
                                    startIcon={<AddIcon />}
                                >
                                    Cadastrar Evento
                                </Button>
                            </Col>
                        </Row>
                    </Paper>

                    {
                        eventos.map((evento) => (
                            <CardEvento
                                key={evento.id}
                                foto={
                                    <img
                                        src={eventoFoto}
                                        alt="Logo of BH Tec"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                }
                                conteudo={
                                    <p className="fw-normal">
                                        <Row className="pt-4">
                                            <b className="fs-4 fw-normal" style={{ color: "#189995", textDecoration: 'underline' }}>
                                                {evento.nome}
                                            </b>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Início: {Moment(evento.data_inicio).format('DD/MM/YYYY')}
                                                    </b>
                                                </Row>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Fim: {Moment(evento.data_fim).format('DD/MM/YYYY')}
                                                    </b>
                                                </Row>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Ingressos: {evento.quantia_de_pessoas} pessoas
                                                    </b>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Organizador: {mostraOrganizador(evento)}
                                                    </b>
                                                </Row>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Responsável: {evento.responsavel_pelo_cadastro}
                                                    </b>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </p>
                                }
                                butao={
                                    <div className="mt-auto p-2">
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none", color: "white" }} onClick={() => navegar({
                                            pathname: "/atualizarEvento",
                                            search: createSearchParams({ id: evento.id.toString() }).toString()
                                        })}><EditIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none", color: "white" }} onClick={() => handleOpenDeleteEvento(evento)}><DeleteIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none", color: "white" }} onClick={() => (navegar({
                                            pathname: "/residuoEvento",
                                            search: `?id=${evento.id}`,
                                        }))}><RecyclingIcon /></Button>
                                    </div>
                                }
                            />
                        ))
                    }

                </Col >
            </Row >
            <ConfirmarDelete
                open={openEventoDeletar}
                id={eventoParaDeletar?.id}
                onClose={handleCloseDeleteEvento}
                onSubmitValue={handleDeleteEvento}
                title="Deletar Evento?"
                mensagem="Você realmente deseja deletar este evento?"
            />
        </>
    );
}
