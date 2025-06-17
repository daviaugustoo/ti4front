import { Autocomplete, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, InputGroup, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getEmpresas } from "../services/EmpresasService";
import { useNavigate } from "react-router";
import { getEvento, putEvento } from "../services/EventosService";
import TextField from '@mui/material/TextField';
import { useSearchParams } from "react-router-dom";
import InputMask from 'react-input-mask';

export default function AtualizarEvento() {
    const navegar = useNavigate();
    const id = Number(useSearchParams()[0].get("id"));

    const [evento, setEvento] = useState<Evento>();
    const [nome, setNome] = useState<string>("");
    const [dataInicio, setDataInicio] = useState<Date>();
    const [dataFim, setDataFim] = useState<Date>();

    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [empresaLista, setEmpresaLista] = useState<string[]>([]);
    const [empresaEvento, setEmpresaEvento] = useState<string>("");
    const [organizador, setOrganizador] = useState<string>("");
    const [responsavel, setResponsavel] = useState<string>("");
    const [quantidadePessoas, setQuantidadePessoas] = useState<number>(0);
    const [quantidadePessoasError, setQuantidadePessoasError] = useState<string>("");
    const [observacoes, setObservacoes] = useState<string>("");

    useEffect(() => {
        const buscaData = async () => {
            try {
                const buscaEmpresas = await getEmpresas();
                setEmpresas(buscaEmpresas);
                const nomes = buscaEmpresas.map((empresa: Empresa) => empresa.nome);
                setEmpresaLista(nomes);

                const evento = await getEvento(id);
                setEvento(evento);
                setNome(evento.nome);
                setDataInicio(new Date(evento.data_inicio));
                setDataFim(new Date(evento.data_fim));
                setOrganizador(evento.organizador);
                setResponsavel(evento.responsavel_pelo_cadastro);
                setQuantidadePessoas(evento.quantia_de_pessoas);
                setObservacoes(evento.observacoes);

                const empresaDoEvento = buscaEmpresas.find((e: Empresa) => e.id === evento.empresa_id);
                if (empresaDoEvento) {
                    setEmpresaEvento(empresaDoEvento.nome);
                }
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        buscaData();
    }, [id]);

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

        const empresaSelecionada = empresas.find(empresa =>
            empresa.nome.trim().toLowerCase() === empresaEvento.trim().toLowerCase()
        );
        const idEmpresa = empresaSelecionada?.id;

        if (
            nome &&
            dataInicio &&
            dataFim &&
            idEmpresa !== undefined &&
            responsavel &&
            quantidadePessoas >= 0
        ) {
            const novoEvento = {
                nome: nome,
                data_inicio: dataInicio,
                empresa_id: idEmpresa,
                data_fim: dataFim,
                organizador: organizador,
                quantia_de_pessoas: quantidadePessoas,
                observacoes: observacoes,
                responsavel_pelo_cadastro: responsavel
            };

            await putEvento(id, novoEvento);
            alert("Evento atualizado com sucesso!");
            navegar("/eventos");
        }
    }

    return (
        <Paper>
            <Form className="p-5" onSubmit={criarEvento}>
                <h1 className="text-center" style={{ color: "#189995" }}>Atualizar Evento</h1>
                <Row className="mt-4">
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setNome(evt.target.value)}
                                type="text"
                                placeholder="Informe o NOME do evento"
                                value={nome}
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Início:</InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="data_inicio"
                                onChange={e => setDataInicio(new Date(e.target.value))}
                                value={dataInicio ? dataInicio.toISOString().split("T")[0] : ""}
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Fim:</InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="data_fim"
                                onChange={e => setDataFim(new Date(e.target.value))}
                                value={dataFim ? dataFim.toISOString().split("T")[0] : ""}
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
                                value={responsavel}
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
                                value={empresaEvento}
                                onChange={(event, valor) => {
                                    setEmpresaEvento(valor || "");
                                }}
                                renderInput={(params) => <TextField {...params} label="Empresa" />}
                                sx={{
                                    width: 350,
                                    '& .MuiInputBase-root': {
                                        height: 38,
                                        fontSize: '0.9rem',
                                        padding: 0,
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '0.9rem',
                                        top: '-6px',
                                    }
                                }}
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
                                value={organizador}
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
                                value={observacoes}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Box className="text-end">
                    <Button
                        type="submit"
                        style={{ backgroundColor: "#189995", border: "none" }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </Form>
        </Paper>
    );
}