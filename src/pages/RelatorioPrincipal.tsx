import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getEventos } from "../services/EventosService";
import { colors, Paper } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getResiduos } from "../services/ResiduosService";
import { relatorioMensal, graficoMediaResiduos } from "../services/MetricasService";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { time } from "console";
import CardEmBranco from "../components/CardEmBranco";


export default function RelatorioPrincipal() {

    const [media, setMedia] = useState<any[]>([])
    const [relatorio, setRelatorio] = useState({
        quatia_empresas: 0,
        quantia_eventos: 0,
        maior_residuo: 0,
        maior_residuo_valor: "",
        maior_evento: "",
        total_residuo_no_mes: 0
    })

    useEffect(() => {
        const buscaData = async () => {
            try {
                const relatorio = await relatorioMensal();
                const graficoMedia = await graficoMediaResiduos();
                setMedia([
                    { tipo: "Papel", quantidade: graficoMedia.papel || 0 },
                    { tipo: "Plástico", quantidade: graficoMedia.plastico || 0 },
                    { tipo: "Metal", quantidade: graficoMedia.metal || 0 },
                    { tipo: "Vidro", quantidade: graficoMedia.vidro || 0 },
                    { tipo: "Orgânico", quantidade: graficoMedia.organico || 0 },
                    { tipo: "Perigoso", quantidade: graficoMedia.perigoso || 0 },
                    { tipo: "Isopor", quantidade: graficoMedia.isopor || 0 }
                ])
                setRelatorio(relatorio)

            }
            catch (error) {
                console.log(error)
            }
        }
        buscaData()
    }, [])


    return (
        <>
            <Row>
                <Col>
                    <Paper className="p-1 mb-3" style={{ backgroundColor: "#189995" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#474646" }}>Relatorio Mensal</h2>
                        </Col>
                    </Paper>
                    <Row>
                        <Col>
                            <Paper className="p-3 mb-3">
                                <CardEmBranco
                                    titulo="Quantia de Empresas Cadastradas"
                                    conteudo={relatorio.quatia_empresas.toString()}
                                />
                            </Paper>
                        </Col>
                        <Col>
                            <Paper className="p-3 mb-3">
                                <CardEmBranco
                                    titulo="Quantia de Eventos Realizados Nesse Mes"
                                    conteudo={relatorio.quantia_eventos.toString()}
                                />
                            </Paper>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Paper className="p-3 mb-3">
                                <CardEmBranco
                                    titulo="Residuo Mais Gerado"
                                    conteudo={relatorio.maior_residuo.toString() + " - " + relatorio.maior_residuo_valor.toString() + " Sacos"}
                                />
                            </Paper>
                        </Col>
                        <Col>
                            <Paper className="p-3 mb-3">
                                <CardEmBranco
                                    titulo="Maior Evento Realizado"
                                    conteudo={relatorio.maior_evento.toString()}
                                />
                            </Paper>
                        </Col>
                        <Col>
                            <Paper className="p-3 mb-3">
                                <CardEmBranco
                                    titulo="Total Residuos do Mes"
                                    conteudo={relatorio.total_residuo_no_mes.toString() + " Sacos"}
                                />
                            </Paper>
                        </Col>
                    </Row>
                    <Paper className="p-3 mb-1" >
                        <Row>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={media}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="tipo" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="quantidade" fill="#189995" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Row>
                    </Paper>
                </Col >
            </Row >
        </>
    )
}