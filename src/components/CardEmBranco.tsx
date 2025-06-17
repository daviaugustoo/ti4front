import { Card, } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ReactNode } from "react";
import EventIcon from '@mui/icons-material/Event';

type cardProps = {
    titulo: ReactNode;
    conteudo: ReactNode;
}

export default function CardTotalClientes({ titulo, conteudo }: cardProps) {

    return (
        <>
            <Row>
                <Col className='col-2'>
                    <Card className="w-15 h-40 p-3 mx-3 text-center" sx={{ background: "#189995", marginTop: "-20px", float: "left" }}>
                        <EventIcon className="text-light" />
                    </Card>
                </Col>
                <Col className="m-2 text-end">
                    <p className="fw-normal" >
                        <b>{titulo}</b>
                        <br />
                        <b className="fs-2 fw-normal" style={{ color: "#189995" }}>
                            {conteudo}
                        </b>
                    </p>
                </Col>
            </Row>
        </>
    );
}

