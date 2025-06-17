import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Col, Form, Button, InputGroup } from "react-bootstrap";



interface AtualizarEmpresaProps {
    title: string;
    empresa?: Empresa;
    open: boolean;
    onClose: () => void;
    onSubmitValue: (empresa: EmpresaPayload) => void;
}

export default function AtualizarEmpresa({
    title,
    empresa,
    open,
    onClose,
    onSubmitValue,
}: AtualizarEmpresaProps) {

    async function handleSubmitAnimalUpdate(event: any) {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            cnpj: { value: string };
            contato: { value: string };
        };

        const nome = target.name.value;
        const cnpj = target.cnpj.value;
        const contato = target.contato.value;

        if (nome && cnpj && contato) {

            const atualizaEmpresa = {
                nome: nome,
                cnpj: cnpj,
                contato: contato
            }
            //onSubmitValue(atualizaEmpresa);
        }
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
                                name="name"
                                defaultValue={empresa?.nome}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cnpj">
                            <Form.Label>Cnpj</Form.Label>
                            <Form.Control
                                type="text"
                                name="cnpj"
                                defaultValue={empresa?.cnpj}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="contato">
                            <Form.Label>Contato</Form.Label>
                            <Form.Control
                                type="text"
                                name="contato"
                                defaultValue={empresa?.email}
                            />
                        </Form.Group>
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

