import { Autocomplete, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, InputGroup, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getEmpresas } from "../services/EmpresasService";
import { useNavigate } from "react-router";
import { postEvento } from "../services/EventosService";
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

export default function NovoEvento() {
    const navegar = useNavigate();
    const [nome, setNome] = useState<string>("");
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [empresaLista, setEmpresaLista] = useState<string[]>([]);
    const [empresaEvento, setEmpresaEvento] = useState<string>("");
    const [organizador, setOrganizador] = useState<string>("");
    const [responsavel, setResponsavel] = useState<string>("");
    const [quantidadePessoas, setQuantidadePessoas] = useState<number>(0);
    const [observacoes, setObservacoes] = useState<string>("");
    const [quantidadePessoasError, setQuantidadePessoasError] = useState<string>("");

    useEffect(() => {
        const buscaData = async () => {
            try {
                const empresas = await getEmpresas();
                setEmpresas(empresas);
                setEmpresaLista(empresas.map((empresa: Empresa) => String(empresa.nome)));
            } catch (error) {
                console.log("Erro ao buscar empresas:", error);
            }
        };
        buscaData();
    }, []);

    function validarQuantidadePessoas(valor: number) {
        return Number.isInteger(valor) && valor >= 0;
    }

    async function criarEvento(e: React.FormEvent) {
        e.preventDefault();
        setQuantidadePessoasError("");
        let erro = false;

        if (!validarQuantidadePessoas(quantidadePessoas)) {
            setQuantidadePessoasError("Informe apenas números inteiros positivos");
            erro = true;
        }
        if (erro) return;

        const empresaEncontrada = empresas.find(empresa =>
            empresa.nome?.trim().toLowerCase() === empresaEvento?.trim().toLowerCase()
        );
        const idEmpresa = empresaEncontrada?.id;

        if (
            nome &&
            dataInicio &&
            dataFim &&
            idEmpresa !== undefined &&
            responsavel &&
            quantidadePessoas >= 0
        ) {
            const novoEvento = {
                nome,
                data_inicio: dataInicio,
                empresa_id: idEmpresa,
                data_fim: dataFim,
                organizador,
                quantia_de_pessoas: quantidadePessoas,
                observacoes,
                responsavel_pelo_cadastro: responsavel
            };

            await postEvento(novoEvento);
            alert("Evento cadastrado com sucesso!");
            navegar("/eventos");
        }
    }

    return (
        <Paper>
            <Form className="p-5" onSubmit={criarEvento}>
                <h1 className="text-center" style={{ color: "#189995" }}>Cadastro de Evento</h1>
                <Row className="mt-4">
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setNome(evt.target.value)}
                                type="text"
                                placeholder="Informe o NOME do evento"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Início:</InputGroup.Text>
                            <Form.Control
                                type="date"
                                onChange={e => setDataInicio(new Date(e.target.value))}
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Fim:</InputGroup.Text>
                            <Form.Control
                                type="date"
                                onChange={e => setDataFim(new Date(e.target.value))}
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Quantidade de Pessoas:</InputGroup.Text>
                            <InputMask
                                mask="999"
                                value={quantidadePessoas ? quantidadePessoas.toString() : ""}
                                onChange={(evt) => setQuantidadePessoas(Number(evt.target.value))}
                            >
                                {(inputProps: any) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Informe a Quantia de Pessoas"
                                        required
                                        min={0}
                                        step={1}
                                        isInvalid={!!quantidadePessoasError}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">{quantidadePessoasError}</Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Responsável Pelo Cadastro:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Quem inseriu as informações?"
                                onChange={(evt) => setResponsavel(evt.target.value)}
                                required
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <hr className="p-2" />
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Empresa do Evento:</InputGroup.Text>
                            <Autocomplete
                                disablePortal
                                options={empresaLista}
                                onChange={(event, valor) => {
                                    setEmpresaEvento(valor ? String(valor) : "");
                                }}
                                renderInput={(params) => <TextField {...params} label="Empresa" />}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Organizador:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Informe o ORGANIZADOR"
                                onChange={(evt) => setOrganizador(evt.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Observações:</InputGroup.Text>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Informe as OBSERVAÇÕES"
                                onChange={(evt) => setObservacoes(evt.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Box className="text-end">
                    <Button type="submit" style={{ backgroundColor: "#189995", border: "none" }}>
                        Cadastrar
                    </Button>
                </Box>
            </Form>
        </Paper>
    );
}