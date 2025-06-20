import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { relatorioMensal, graficoMediaResiduos, graficoMediaResiduosTotal } from "../services/MetricasService";
import * as React from 'react';
import CardEmBranco from "../components/CardEmBranco";

export default function RelatorioPrincipal() {

    const [media, setMedia] = useState<any[]>([])
    const [mediaTotal, setMediaTotal] = useState<any[]>([])
    const [residuosMaiorEvento, setResiduosMaiorEvento] = useState<any[]>([])
    const [valorCardMaiorResiduo, setValorCardMaiorResiduo] = useState<string>("");
    const [relatorio, setRelatorio] = useState({
        quatia_empresas: 0,
        quantia_eventos: 0,
        maior_residuo: 0,
        maior_residuo_valor: "",
        maior_evento: {} as Evento,
        total_residuo_no_mes: 0
    })

    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const currentYear = currentDate.getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const anosDisponiveis = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

    useEffect(() => {
        const buscaData = async () => {
            try {
                const relatorio = await relatorioMensal(selectedMonth, selectedYear);
                if (relatorio.maior_evento === null) {
                    relatorio.maior_evento = {
                        id: 0,
                        nome: "Nenhum Evento Realizado",
                    }
                }
                if (relatorio.residuos_maior_evento === null) {
                    relatorio.residuos_maior_evento = {
                        papel: 0,
                        plastico: 0,
                        metal: 0,
                        vidro: 0,
                        organico: 0,
                        perigoso: 0,
                        isopor: 0
                    }
                }
                if (relatorio.maior_residuo === null) {
                    setValorCardMaiorResiduo("Nenhum Resíduo Gerado")
                } else {
                    setValorCardMaiorResiduo(relatorio.maior_residuo + " - " + relatorio.maior_residuo_valor.toString() + " Sacos")
                }
                if (relatorio.maior_residuo_valor === null) {
                    relatorio.maior_residuo_valor = "0"
                }
                const graficoMedia = await graficoMediaResiduos(selectedMonth, selectedYear);
                const graficoMediaTotal = await graficoMediaResiduosTotal();
                console.log(graficoMedia.papel)
                setMedia([
                    { tipo: "Papel", Sacos: graficoMedia.papel },
                    { tipo: "Plástico", Sacos: graficoMedia.plastico || 0 },
                    { tipo: "Metal", Sacos: graficoMedia.metal || 0 },
                    { tipo: "Vidro", Sacos: graficoMedia.vidro || 0 },
                    { tipo: "Orgânico", Sacos: graficoMedia.organico || 0 },
                    { tipo: "Perigoso", Sacos: graficoMedia.perigoso || 0 },
                    { tipo: "Isopor", Sacos: graficoMedia.isopor || 0 }
                ])
                setMediaTotal([
                    { tipo: "Papel", Sacos: graficoMediaTotal.papel || 0 },
                    { tipo: "Plástico", Sacos: graficoMediaTotal.plastico || 0 },
                    { tipo: "Metal", Sacos: graficoMediaTotal.metal || 0 },
                    { tipo: "Vidro", Sacos: graficoMediaTotal.vidro || 0 },
                    { tipo: "Orgânico", Sacos: graficoMediaTotal.organico || 0 },
                    { tipo: "Perigoso", Sacos: graficoMediaTotal.perigoso || 0 },
                    { tipo: "Isopor", Sacos: graficoMediaTotal.isopor || 0 }
                ])
                setResiduosMaiorEvento([
                    { tipo: "Papel", Sacos: relatorio.residuos_maior_evento.papel || 0 },
                    { tipo: "Plástico", Sacos: relatorio.residuos_maior_evento.plastico || 0 },
                    { tipo: "Metal", Sacos: relatorio.residuos_maior_evento.metal || 0 },
                    { tipo: "Vidro", Sacos: relatorio.residuos_maior_evento.vidro || 0 },
                    { tipo: "Orgânico", Sacos: relatorio.residuos_maior_evento.organico || 0 },
                    { tipo: "Perigoso", Sacos: relatorio.residuos_maior_evento.perigoso || 0 },
                    { tipo: "Isopor", Sacos: relatorio.residuos_maior_evento.isopor || 0 }
                ])
                setRelatorio(relatorio)

            }
            catch (error) {
                console.log(error)
            }
        }
        buscaData()
    }, [selectedMonth, selectedYear])

    return (
        <>
            {/* Filtro de mês */}
            <Paper style={{
                backgroundColor: "#189995", height: "52px", width: "300px", right: "20px", top: "20px"
            }} className="p-2 mb-3">
                <Row className="justify-content-end align-items-center">
                    <Col className="justify-content-end text-end">
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: "#ffffff" }}
                                id="mes-label">Mês</InputLabel>
                            <Select
                                size="small"
                                labelId="mes-label"
                                label="Mês"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                sx={{ color: "#ffffff" }}
                            >
                                {
                                    [
                                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
                                    ].map((mes, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {mes}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Col>

                    {/* Filtro de ano */}
                    <Col className="justify-content-end text-end">
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: "#ffffff" }}
                                id="ano-label">Ano</InputLabel>
                            <Select
                                label="Ano"
                                size="small"
                                labelId="ano-label"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                sx={{ color: "#ffffff" }}

                            >
                                {anosDisponiveis.map((ano) => (
                                    <MenuItem key={ano} value={ano}>
                                        {ano}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
            </Paper >
            <Paper className="p-1 mb-3" style={{ backgroundColor: "#189995" }}>
                <Col className="justify-content-center text-center">
                    <h2 style={{ color: "#ffffff" }}>Relatório Mensal</h2>
                </Col>
            </Paper>
            <Row>
                <Col>
                    <Paper className="p-3 mb-3">
                        <CardEmBranco
                            titulo="Quantidade de Empresas Cadastradas"
                            conteudo={relatorio.quatia_empresas.toString()}
                        />
                    </Paper>
                </Col>
                <Col>
                    <Paper className="p-3 mb-3">
                        <CardEmBranco
                            titulo="Quantidade de Eventos Realizados Neste Mês"
                            conteudo={relatorio.quantia_eventos.toString()}
                        />
                    </Paper>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Paper className="p-3 mb-3" style={{ height: "200px", width: "360px" }}>
                        <CardEmBranco
                            titulo="Resíduo Mais Gerado"
                            conteudo={valorCardMaiorResiduo}
                        />
                    </Paper>
                </Col>
                <Col>
                    <Paper className="p-3 mb-3" style={{ height: "200px", width: "360px" }}>
                        <CardEmBranco
                            titulo="Maior Evento Realizado"
                            conteudo={relatorio.maior_evento.nome}
                        />
                    </Paper>
                </Col>
                <Col>
                    <Paper className="p-3 mb-3" style={{ height: "200px", width: "360px" }}>
                        <CardEmBranco
                            titulo="Total de Resíduos do Mês"
                            conteudo={relatorio.total_residuo_no_mes.toString()}
                        />
                    </Paper>
                </Col>
            </Row>
            <Paper className="p-3 mb-1">
                <Row>
                    <Col className="justify-content-center text-center">
                        <h3 style={{ color: "#189995" }}>Resíduos do Evento {relatorio.maior_evento.nome}:</h3>
                    </Col>
                    <ResponsiveContainer width="100%" height={250} className="mt-3">
                        <BarChart data={residuosMaiorEvento}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Sacos" fill="#189995" />
                        </BarChart>
                    </ResponsiveContainer>
                </Row>
                <Row>
                    <Col className="justify-content-center text-center">
                        <h3 style={{ color: "#189995" }}>Média de Resíduos do Mês:</h3>
                    </Col>
                    <ResponsiveContainer width="100%" height={250} className="mt-3">
                        <BarChart data={media}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Sacos" fill="#189995" />
                        </BarChart>
                    </ResponsiveContainer>
                </Row>
                <Row>
                    <Col className="justify-content-center text-center">
                        <h3 style={{ color: "#189995" }}>Média de Resíduos Totais:</h3>
                    </Col>
                    <ResponsiveContainer width="100%" height={250} className="mt-3">
                        <BarChart data={mediaTotal}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Sacos" fill="#189995" />
                        </BarChart>
                    </ResponsiveContainer>
                </Row>
            </Paper>
        </>
    )
}
