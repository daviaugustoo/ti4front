import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    emphasize,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Col, Form, Button, InputGroup } from "react-bootstrap";
import Moment from "moment"



interface AtualizarEventoProps {
    title: string;
    evento?: Evento;
    open: boolean;
    onClose: () => void;
    onSubmitValue: (empresa: EventoPayload) => void;
}

export default function AtualizarEvento({
    title,
    evento,
    open,
    onClose,
    onSubmitValue,
}: AtualizarEventoProps) {

    const [dataa, setDataa] = useState<Date>(new Date());

    async function handleSubmitAnimalUpdate(event: any) {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            nome: { value: string };
            expectativaResiduos: { value: number };
        };

        const nome = target.nome.value;
        const data = dataa;
        const empresa_id = evento?.empresa_id;
        console.log("Atualizando evento", nome, data);


        // if (nome && data && empresa_id) {
        //     console.log("Atualizando evento", nome, data);
        //     const atualizaEvento = {
        //         nome,
        //         data,
        //         empresa_id
        //     }
        //     onSubmitValue(atualizaEvento);
        // }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Form className=" w-150" onSubmit={handleSubmitAnimalUpdate}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                defaultValue={evento?.nome}
                            />
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data:</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                type="date"
                                name="data"
                                onChange={e => setDataa(new Date(e.target.value))}
                                required
                            />
                        </InputGroup>

                    </DialogContent>
                    <DialogActions>
                        <Col>
                            <Button className=" btn btn-danger" onClick={onClose}>
                                CANCELAR
                            </Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="btn btn-success" type="submit">
                                SALVAR
                            </Button>
                        </Col>
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
}