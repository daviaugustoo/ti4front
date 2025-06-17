import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CardEvento from "../components/CardEvento";
import logo from "../../imgs/icone_bhtec.jpg"
import AddIcon from '@mui/icons-material/Add';
import { createSearchParams, useNavigate } from "react-router-dom";
import { deleteEvento, putEvento } from "../services/EventosService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AtualizarEvento from "../components/AtualizarEvento";
import ConfirmarDelete from "../components/ConfirmarDelete";
import { getEventos } from "../services/EventosService";
import eventoFoto from "../imgs/Evento-Corporativo.jpg"
import RecyclingIcon from '@mui/icons-material/Recycling';
import Moment from 'moment';
import { getEmpresas } from "../services/EmpresasService";


export default function Eventos() {
    const navegar = useNavigate();
    const [eventos, setEventos] = useState<Evento[]>([]);
    const data = new Date("10-10-1999")
    const [eventoParaAtualizar, setEventoParaAtualizar] = useState<Evento>();
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [openEventoAtualizar, setOpenEventoAtualizar] = useState<boolean>(false);
    const [eventoParaDeletar, setEventoParaDeletar] = useState<Evento>();
    const [openEventoDeletar, setOpenEventoDeletar] = useState<boolean>(false);


    useEffect(() => {
        const buscaData = async () => {
            try {
                const eventos = await getEventos();
                setEventos(eventos)
            }
            catch (error) {
                console.log("Erro ao buscar eventos:", error);
            }
            try {
                const empresas = await getEmpresas();
                setEmpresas(empresas);
            }
            catch (error) {
                console.log("Erro ao buscar empresas:", error);
            }
        };
        buscaData();
        //setEventos(a)

    }, []);

    function handleOpenAtualizaEvento(evento: Evento) {
        setEventoParaAtualizar(evento);
        setOpenEventoAtualizar(true);
    }

    async function handleAtualizaEvento(evento: EventoPayload) {
        console.log(eventoParaAtualizar?.id)
        try {
            if (eventoParaAtualizar) {
                await putEvento(eventoParaAtualizar?.id, evento);
                const eventosAtualizados = await getEventos(); // Atualiza lista
                setEventos(eventosAtualizados);
            }
        } catch (error) {
            console.log("Erro ao atualizar evento:", error);
        }
        handleCloseAtualizaEvento();

    }

    function handleCloseAtualizaEvento() {
        setOpenEventoAtualizar(false);
    }

    function handleOpenDeleteEvento(evento: Evento) {
        setEventoParaDeletar(evento);
        setOpenEventoDeletar(true);
    }

    async function handleDeleteEvento(id: number) {
        console.log(id)
        try {
            if (eventoParaDeletar) {
                await deleteEvento(id);
                const eventosAtualizados = await getEventos(); // Atualiza lista
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
            return buscaEmpresa(evento.empresa_id);
        }
    }

    function buscaEmpresa(empresaId: number) {
        const empresa = empresas.find((empresa) => empresa.id === empresaId)
        return empresa?.nome
    }

    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#ffffff" }}>Lista de Eventos</h2>
                        </Col>
                    </Paper>

                    {eventos.map((evento) => (
                        <CardEvento
                            foto={
                                <>
                                    <img src={eventoFoto} alt="Logo of BH Tec" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </>
                            }
                            conteudo={
                                <>
                                    <p className="fw-normal">
                                        <Row className="pt-4">
                                            <b className="fs-4 fw-normal" style={{ color: "#189995", fontSize: "px", textDecoration: 'underline', borderRight: "4px #000", paddingBottom: "20px" }}>
                                                {evento.nome}
                                            </b>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Inicio: {Moment(evento.data_inicio).format('DD/MM/YYYY')}
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
                                </>
                            }
                            butao={
                                <>
                                    <div className="mt-auto p-2">
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => navegar({
                                            pathname: "/atualizarEvento",
                                            search: createSearchParams({
                                                id: evento.id.toString()
                                            }).toString()
                                        })}><EditIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => handleOpenDeleteEvento(evento)}><DeleteIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => (navegar({
                                            pathname: "/residuoEvento",
                                            search: `?id=${evento.id}`,
                                        }))}><RecyclingIcon /></Button>
                                    </div>
                                </>
                            }
                        />
                    ))}
                    <Col className="justify-content-center text-end">
                        <Button style={{ backgroundColor: "#189995", border: "none", }} onClick={() => {
                            navegar({
                                pathname: "/novoEvento",
                            });
                        }}><AddIcon sx={{ fontSize: "large" }} />  Cadastrar Evento</Button>
                    </Col>
                </Col>
            </Row>
            <AtualizarEvento
                open={openEventoAtualizar}
                onClose={handleCloseAtualizaEvento}
                evento={eventoParaAtualizar}
                onSubmitValue={handleAtualizaEvento}
                title="Atualizar Evento" />
            <ConfirmarDelete
                open={openEventoDeletar}
                id={eventoParaDeletar?.id}
                onClose={handleCloseDeleteEvento}
                onSubmitValue={handleDeleteEvento}
                title="Deletar Evento?"
                mensagem="Você realmente deseja deletar este evento?" />
        </>
    )
}