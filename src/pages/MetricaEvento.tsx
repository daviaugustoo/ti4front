import { Button, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getResiduoByEventoId, putResiduo } from "../services/ResiduosService";
import InputMask from 'react-input-mask';

export default function MetricaEvento() {
    const id = useSearchParams()[0].get("id") as string;
    const navegar = useNavigate();
    const [residuo, setResiduo] = useState<Residuo>();
    const [residuoPapel, setResiduoPapel] = useState<number>(0);
    const [residuoPlastico, setResiduoPlastico] = useState<number>(0);
    const [residuoMetal, setResiduoMetal] = useState<number>(0);
    const [residuoVidro, setResiduoVidro] = useState<number>(0);
    const [residuoOrganico, setResiduoOrganico] = useState<number>(0);
    const [residuoPerigoso, setResiduoPerigoso] = useState<number>(0);
    const [residuoIsopor, setResiduoIsopor] = useState<number>(0);
    const [habilitarForm, setHabilitarForm] = useState<boolean>(true);
    const [residuoPapelError, setResiduoPapelError] = useState<string>("");
    const [residuoPlasticoError, setResiduoPlasticoError] = useState<string>("");
    const [residuoMetalError, setResiduoMetalError] = useState<string>("");
    const [residuoVidroError, setResiduoVidroError] = useState<string>("");
    const [residuoOrganicoError, setResiduoOrganicoError] = useState<string>("");
    const [residuoPerigosoError, setResiduoPerigosoError] = useState<string>("");
    const [residuoIsoporError, setResiduoIsoporError] = useState<string>("");

    useEffect(() => {
        const buscaData = async () => {
            try {
                const residuo = await getResiduoByEventoId(Number(id));
                setResiduo(residuo);
                setResiduoPapel(residuo.papel);
                setResiduoPlastico(residuo.plastico);
                setResiduoMetal(residuo.metal);
                setResiduoVidro(residuo.vidro);
                setResiduoOrganico(residuo.organico);
                setResiduoIsopor(residuo.isopor);
                setResiduoPerigoso(residuo.perigoso);
            } catch (error) {
                console.log("Erro ao buscar resíduos:", error);
            }
        };
        buscaData();
    }, [id]);

    function validarResiduo(valor: number) {
        return Number.isInteger(valor) && valor >= 0;
    }

    async function criaResiduo(e?: React.FormEvent) {
        if (e) e.preventDefault();
        setResiduoPapelError("");
        setResiduoPlasticoError("");
        setResiduoMetalError("");
        setResiduoVidroError("");
        setResiduoOrganicoError("");
        setResiduoPerigosoError("");
        setResiduoIsoporError("");
        let erro = false;

        if (!validarResiduo(residuoPapel)) {
            setResiduoPapelError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoPlastico)) {
            setResiduoPlasticoError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoMetal)) {
            setResiduoMetalError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoVidro)) {
            setResiduoVidroError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoOrganico)) {
            setResiduoOrganicoError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoPerigoso)) {
            setResiduoPerigosoError("Apenas números inteiros positivos");
            erro = true;
        }
        if (!validarResiduo(residuoIsopor)) {
            setResiduoIsoporError("Apenas números inteiros positivos");
            erro = true;
        }
        if (erro) return;

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
            };
            await putResiduo(Number(id), novoResiduo);
            navegar(-1);
        }
    }

    function handleCheckboxChange() {
        setHabilitarForm(!habilitarForm);
    }

    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#474646" }}>Alterar Métricas</h2>
                        </Col>
                    </Paper>
                    <Paper>
                        <Form className="p-3" style={{ backgroundColor: "#f5f5f5" }} onSubmit={criaResiduo}>
                            <Form.Group className="mb-3">
                                <Form.Check checked={!habilitarForm} onChange={handleCheckboxChange} type="checkbox" label="Foi medido a quantidade de resíduos?" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Papel</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoPapel ? residuoPapel.toString() : ""}
                                            onChange={(evt) => setResiduoPapel(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.papel}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoPapelError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoPapelError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Plástico</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoPlastico ? residuoPlastico.toString() : ""}
                                            onChange={(evt) => setResiduoPlastico(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.plastico}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoPlasticoError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoPlasticoError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Metal</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoMetal ? residuoMetal.toString() : ""}
                                            onChange={(evt) => setResiduoMetal(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.metal}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoMetalError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoMetalError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vidro</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoVidro ? residuoVidro.toString() : ""}
                                            onChange={(evt) => setResiduoVidro(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.vidro}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoVidroError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoVidroError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Orgânico</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoOrganico ? residuoOrganico.toString() : ""}
                                            onChange={(evt) => setResiduoOrganico(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.organico}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoOrganicoError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoOrganicoError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Perigoso</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoPerigoso ? residuoPerigoso.toString() : ""}
                                            onChange={(evt) => setResiduoPerigoso(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.perigoso}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoPerigosoError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoPerigosoError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Isopor</Form.Label>
                                        <InputMask
                                            mask="999"
                                            value={residuoIsopor ? residuoIsopor.toString() : ""}
                                            onChange={(evt) => setResiduoIsopor(Number(evt.target.value))}
                                        >
                                            {(inputProps: any) => (
                                                <Form.Control
                                                    {...inputProps}
                                                    type="text"
                                                    defaultValue={residuo?.isopor}
                                                    disabled={habilitarForm}
                                                    placeholder="Quantidade de Sacos"
                                                    min={0}
                                                    step={1}
                                                    isInvalid={!!residuoIsoporError}
                                                />
                                            )}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">{residuoIsoporError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button style={{ backgroundColor: "#189995", border: "none", marginLeft: "10px" }} onClick={() => navegar(-1)}>
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col className="justify-content-end text-end">
                                    <Button style={{ backgroundColor: "#189995", border: "none" }} onClick={criaResiduo}>
                                        Salvar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Paper>
                </Col>
            </Row>
        </>
    );
}