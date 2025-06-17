import { Autocomplete, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { putEmpresa, getEmpresa } from "../services/EmpresasService";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import InputMask from 'react-input-mask';

export default function AtualizarEmpresa() {
    const id = Number(useSearchParams()[0].get("id") as string);
    const navegar = useNavigate();
    const [empresa, setEmpresa] = useState<Empresa>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresa = await getEmpresa(id);
                setEmpresa(empresa);
                setNome(empresa.nome);
                setCnpj(empresa.cnpj);
                setEmail(empresa.email);
                setSala(empresa.sala);
                setTelefone(empresa.telefone);
                setResponsavel(empresa.responsavel_pelo_cadastro);
            } catch (error) {
                console.log("Erro ao buscar empresa");
            }
        };
        fetchData();
    }, [id]);

    const [nome, setNome] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [sala, setSala] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [responsavel, setResponsavel] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [telefoneError, setTelefoneError] = useState<string>("");
    const [cnpjError, setCnpjError] = useState<string>("");

    function validarEmail(email: string) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }

    function validarTelefone(telefone: string) {
        return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
    }

    function validarCnpj(cnpj: string) {
        return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
    }

    function validarSala(sala: string) {
        return /^\d+$/.test(sala);
    }

    async function atualizarEmpresa(e: React.FormEvent) {
        e.preventDefault();
        setEmailError("");
        setTelefoneError("");
        setCnpjError("");
        let erro = false;

        if (!validarEmail(email)) {
            setEmailError("Email inválido. Use o formato nome@exemplo.com");
            erro = true;
        }
        if (!validarTelefone(telefone)) {
            setTelefoneError("Telefone inválido. Use o formato (99) 99999-9999");
            erro = true;
        }
        if (!validarCnpj(cnpj)) {
            setCnpjError("CNPJ inválido. Use o formato 99.999.999/9999-99");
            erro = true;
        }
        if (!validarSala(sala)) {
            alert("Sala deve conter apenas números.");
            erro = true;
        }
        if (erro) return;

        if (nome && cnpj && email && sala && telefone && responsavel) {
            const novaEmpresa = {
                nome,
                cnpj,
                email,
                sala,
                telefone,
                responsavel_pelo_cadastro: responsavel
            };

            await putEmpresa(id, novaEmpresa);
            alert("Empresa atualizada com sucesso!");
            navegar("/empresas");
        }
    }

    return (
        <Paper>
            <Row>
                <Form className="p-5" onSubmit={atualizarEmpresa}>
                    <h1 className="text-center" style={{ color: "#189995" }}>Atualizar Empresa</h1>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Nome</InputGroup.Text>
                        <Form.Control
                            onChange={(evt) => setNome(evt.target.value)}
                            type="text"
                            placeholder="Informe o NOME"
                            defaultValue={empresa?.nome}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>CNPJ</InputGroup.Text>
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={cnpj}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setCnpj(evt.target.value)}
                        >
                            {(inputProps: any) => (
                                <Form.Control
                                    {...inputProps}
                                    type="text"
                                    placeholder="Informe o CNPJ"
                                    required
                                    isInvalid={!!cnpjError}
                                    defaultValue={empresa?.cnpj}
                                />
                            )}
                        </InputMask>
                        <Form.Control.Feedback type="invalid">{cnpjError}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <Form.Control
                            value={email}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)}
                            type="email"
                            placeholder="Informe o Email"
                            required
                            isInvalid={!!emailError}
                            defaultValue={empresa?.email}
                        />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Telefone</InputGroup.Text>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTelefone(evt.target.value)}
                        >
                            {(inputProps: any) => (
                                <Form.Control
                                    {...inputProps}
                                    type="text"
                                    placeholder="Informe o TELEFONE"
                                    required
                                    isInvalid={!!telefoneError}
                                    defaultValue={empresa?.telefone}
                                />
                            )}
                        </InputMask>
                        <Form.Control.Feedback type="invalid">{telefoneError}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Responsável pelo Cadastro</InputGroup.Text>
                        <Form.Control
                            onChange={(evt) => setResponsavel(evt.target.value)}
                            type="text"
                            placeholder="Quem está cadastrando?"
                            defaultValue={empresa?.responsavel_pelo_cadastro}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Sala</InputGroup.Text>
                        <Form.Control
                            onChange={(evt) => setSala(evt.target.value)}
                            type="text"
                            placeholder="Informe a SALA"
                            required
                            pattern="\\d+"
                            title="Apenas números"
                            defaultValue={empresa?.sala}
                        />
                    </InputGroup>

                    <Box className="text-end">
                        <Button type="submit" style={{ backgroundColor: "#189995", border: "none" }}>
                            Salvar
                        </Button>
                    </Box>
                </Form>
            </Row>
        </Paper>
    );
}