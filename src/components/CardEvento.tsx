
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect, ReactNode } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { getEmpresas } from "../services/EmpresasService";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type cardProps = {
    foto: ReactNode,
    conteudo: ReactNode,
    butao: ReactNode
}

export default function CardEvento({ foto, conteudo, butao}: cardProps) {


    return (
        <>
            <Paper className="mb-2">
                <Row>
                    <Col lg="4">
                        {foto}
                    </Col>
                    <Col lg="5" className="justify-content-bottom text-initial">
                        {conteudo}
                    </Col>
                    <Col className="d-flex align-items-end flex-column">
                        {butao}
                    </Col>
                </Row>
            </Paper>
        </>
    )

}