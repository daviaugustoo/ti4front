import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { colors, Paper } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getResiduoByEventoId } from "../services/ResiduosService";
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getEvento } from "../services/EventosService";

export default function ResiduosEventos() {
    const eventoId = Number(useSearchParams()[0].get("id") as String)
    const navegar = useNavigate()
    const [evento, setEvento] = useState<Evento>();
    const [residuos, setResiduos] = useState<Residuo>();
    const [dataGrafico, setDataGrafico] = useState<any[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const residuos = await getResiduoByEventoId(Number(eventoId));
                setResiduos(residuos);
                console.log("Resíduos:", residuos);
                setDataGrafico([
                    { tipo: "Papel", quantidade: residuos.papel || 0 },
                    { tipo: "Plástico", quantidade: residuos.plastico || 0 },
                    { tipo: "Metal", quantidade: residuos?.metal || 0 },
                    { tipo: "Vidro", quantidade: residuos?.vidro || 0 },
                    { tipo: "Orgânico", quantidade: residuos?.organico || 0 },
                    { tipo: "Perigoso", quantidade: residuos?.perigoso || 0 },
                    { tipo: "Isopor", quantidade: residuos?.isopor || 0 }
                ])
                const evento = await getEvento(eventoId)
                setEvento(evento)
            }
            catch (error) {
                console.log("Erro ao buscar resíduos:", error);
            }
        }
        fetchData();
    }, [])

    return (
        <Row>
            <Col>
                <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                    <Col className="justify-content-center text-center">
                        <h2 style={{ color: "#ffffff" }}>{evento?.nome}</h2>
                    </Col>
                </Paper>
                <Paper className="p-3 mb-1" >
                    <Row>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dataGrafico}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="tipo" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="quantidade" fill="#189995" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Row>
                    <Row className="justify-content-end text-end" >
                        <Col>
                            <Button style={{ backgroundColor: "#189995", border: "none" }} onClick={() => {
                                navegar({
                                    pathname: "/metricaEvento",
                                    search: `?id=${eventoId}`
                                })
                            }}>Alterar Metricas</Button>
                        </Col>
                    </Row>
                </Paper>
            </Col>
        </Row >
    )
}



// <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//         <TableRow>
//             <TableCell style={{ fontSize: "20px" }}>Tipo de Residuo</TableCell>
//             <TableCell>Medição de Residuo</TableCell>
//             <TableCell style={{ paddingLeft: "90px" }}>Ações</TableCell>
//         </TableRow>
//     </TableHead>
//     <TableBody>
//         <TableRow
//             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//             <TableCell component="th" scope="row">
//                 Papel:
//             </TableCell>
//             <TableCell >{residuos?.papel}</TableCell>
//             <TableCell align="center">
//                 <Button className="m-2" style={{ backgroundColor: "#189995", border: "none" }}><EditIcon /></Button>
//                 <Button style={{ backgroundColor: "#189995", border: "none" }}><DeleteIcon /></Button>
//             </TableCell>
//         </TableRow>
//     </TableBody>
// </Table>