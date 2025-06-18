import { Button, Col, Row, Form } from "react-bootstrap";
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
import { getEventos } from "../services/EventosService";
import RecyclingIcon from '@mui/icons-material/Recycling';
import Moment from 'moment';
import { getResiduoByEventoId, putResiduo } from "../services/ResiduosService";
import ResiduosEventos from "./ResiduosEventos";


export default function MetricaEvento() {
    const id = useSearchParams()[0].get("id") as string;
    const navegar = useNavigate();
    const checkbox = document.getElementById("medicaoResiduos") as HTMLInputElement;
    const [residuo, setResiduo] = useState<Residuo>();
    const [residuoPapel, setResiduoPapel] = useState<number>(0);
    const [residuoPlastico, setResiduoPlastico] = useState<number>(0);
    const [residuoMetal, setResiduoMetal] = useState<number>(0);
    const [residuoVidro, setResiduoVidro] = useState<number>(0);
    const [residuoOrganico, setResiduoOrganico] = useState<number>(0);
    const [residuoPerigoso, setResiduoPerigoso] = useState<number>(0);
    const [residuoIsopor, setResiduoIsopor] = useState<number>(0);
    const [habilitarForm, setHabilitarForm] = useState<boolean>(true)


    useEffect(() => {
        const buscaData = async () => {
            try {
                const residuo = await getResiduoByEventoId(Number(id));
                setResiduo(residuo)
                setResiduoPapel(residuo.papel)
                setResiduoPlastico(residuo.plastico)
                setResiduoMetal(residuo.metal)
                setResiduoVidro(residuo.vidro)
                setResiduoOrganico(residuo.organico)
                setResiduoIsopor(residuo.isopor)
                setResiduoPerigoso(residuo.perigoso)
            }
            catch (error) {
                console.log("Erro ao buscar residuos:", error);
            }
        };
        buscaData();

    }, []);

    async function criaResiduo() {

        if (residuoPapel && residuoPlastico && residuoMetal && residuoVidro && residuoOrganico && residuoPerigoso && residuoIsopor && residuo) {
            const novoResiduo = {
                evento_id: residuo.evento_id,
                papel: residuoPapel,
                plastico: residuoPlastico,
                metal: residuoMetal,
                vidro: residuoVidro,
                organico: residuoOrganico,
                perigoso: residuoPerigoso,
                isopor: residuoIsopor,

            }
            await putResiduo(Number(id), novoResiduo)
            navegar(-1);
        }
    }

    function handleCheckboxChange() {
        setHabilitarForm(!habilitarForm)
    }

    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#ffffff" }}>Alterar Metricas</h2>
                        </Col>
                    </Paper>
                    <Paper>
                        <Form className="p-3" style={{ backgroundColor: "#f5f5f5" }} onSubmit={criaResiduo}>
                            <Form.Group className="mb-3" >
                                <Form.Check checked={!habilitarForm} onChange={handleCheckboxChange} type="checkbox" label="Foi medido a quantidade de residuos?" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Papel</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.papel} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoPapel(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Plastico</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.plastico} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoPlastico(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Metal</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.metal} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoMetal(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Vidro</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.vidro} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoVidro(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Organico</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.organico} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoOrganico(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Perigoso</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.perigoso} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoPerigoso(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Isopor</Form.Label>
                                        <Form.Control type="number" defaultValue={residuo?.isopor} disabled={habilitarForm} placeholder="Quantidade de Sacos" onChange={(evt) => setResiduoIsopor(Number(evt.target.value))} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button style={{ backgroundColor: "#189995", border: "none", marginLeft: "10px" }} onClick={() => {
                                        navegar(-1)
                                    }}>
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col className="justify-content-end text-end">
                                    <Button style={{ backgroundColor: "#189995", border: "none", }} onClick={() => criaResiduo()}>
                                        Salvar
                                    </Button>

                                </Col>
                            </Row>
                        </Form>
                    </Paper>


                </Col>
            </Row>

        </>
    )
}