
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CardEvento from "../components/CardEvento";
import logo from "../imgs/icone_bhtec.jpg"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteEvento, putEvento } from "../services/EventosService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AtualizarEvento from "../components/AtualizarEvento";
import ConfirmarDelete from "../components/ConfirmarDelete";
import { getEventos, getEventosPorEmpresaId } from "../services/EventosService";
import { getEmpresa } from "../services/EmpresasService";
import eventoFoto from "../imgs/Evento-Corporativo.jpg"
import RecyclingIcon from '@mui/icons-material/Recycling';
import Moment from 'moment';


export default function EventosEmpresa() {
    const navegar = useNavigate();
    const empresaId = useSearchParams()[0].get("id") as string;
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [empresa, setEmpresa] = useState<Empresa>()
    const [eventoParaAtualizar, setEventoParaAtualizar] = useState<Evento>();
    const [openEventoAtualizar, setOpenEventoAtualizar] = useState<boolean>(false);
    const [eventoParaDeletar, setEventoParaDeletar] = useState<Evento>();
    const [openEventoDeletar, setOpenEventoDeletar] = useState<boolean>(false);


    useEffect(() => {
        const buscaData = async () => {
            try {
                const eventos = await getEventosPorEmpresaId(empresaId);
                setEventos(eventos)
                const empresa = await getEmpresa(parseInt(empresaId));
                setEmpresa(empresa);
            }
            catch (error) {
                console.log("Erro ao buscar eventos:", error);
            }
        };

        buscaData();
        //setEventos(a)

    }, [openEventoAtualizar, openEventoDeletar]);

    async function handleOpenAtualizaEvento(evento: Evento) {
        setEventoParaAtualizar(evento);
        setOpenEventoAtualizar(true);
    }

    async function handleAtualizaEvento(evento: EventoPayload) {
        setOpenEventoAtualizar(false);
        console.log(eventoParaAtualizar?.id)
        try {
            if (eventoParaAtualizar) {
                await putEvento(eventoParaAtualizar?.id, evento);
            }
        } catch (error) {
            console.log("Erro ao atualizar evento:", error);
        }
    }

    function handleOpenDeleteEvento(evento: Evento) {
        setEventoParaDeletar(evento);
        setOpenEventoDeletar(true);
    }

    async function handleDeleteEvento(id: number) {
        setOpenEventoDeletar(false);
        console.log(id)
        try {
            if (eventoParaDeletar) {
                await deleteEvento(id);
            }
        } catch (error) {
            console.log("Erro ao deletar evento:", error);
        }
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
                                                        Inicio: {Moment(evento.data_inicio).add(1, "day").format('DD/MM/YYYY')}
                                                    </b>


                                                </Row>
                                                <Row>
                                                    <b className="fs-5 fw-normal">
                                                        Fim: {Moment(evento.data_fim).add(1, "day").format('DD/MM/YYYY')}
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
                                                        Organizador: {empresa?.nome}
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
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => (handleOpenAtualizaEvento)}><EditIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => (handleOpenDeleteEvento)}><DeleteIcon /></Button>
                                        <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }} onClick={() => (navegar({
                                            pathname: "/residuoEvento",
                                            search: `?id=${evento.id}`,
                                        }))}><RecyclingIcon /></Button>
                                    </div>
                                </>
                            }
                        />
                    ))}
                    <Button style={{ backgroundColor: "#189995", border: "none", }} onClick={() => {
                        navegar({
                            pathname: "/novoEvento",
                        });
                    }}><AddIcon sx={{ fontSize: "large" }} />  Cadastrar Evento</Button>
                </Col>
            </Row>
            <AtualizarEvento
                open={openEventoAtualizar}
                onClose={() => setOpenEventoAtualizar(false)}
                evento={eventoParaAtualizar}
                onSubmitValue={handleAtualizaEvento}
                title="Atualizar Evento" />
            <ConfirmarDelete
                open={openEventoDeletar}
                id={eventoParaDeletar?.id}
                onClose={() => { setOpenEventoDeletar(false) }}
                onSubmitValue={handleDeleteEvento}
                title="Deletar Evento?"
                mensagem="Você realmente deseja deletar este evento?" />
        </>
    )
}