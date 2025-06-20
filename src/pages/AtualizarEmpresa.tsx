import { Autocomplete, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { putEmpresa, getEmpresa } from "../services/EmpresasService";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import InputMask from 'react-input-mask';

export default function AtualizarEmpresa() {

    const id = Number(useSearchParams()[0].get("id") as string)
    const navegar = useNavigate();
    const [empresa, setEmpresa] = useState<Empresa>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresa = await getEmpresa(id)
                setEmpresa(empresa)
                setNome(empresa.nome);
                setCnpj(empresa.cnpj);
                setEmail(empresa.email);
                setSala(empresa.sala);
                setTelefone(empresa.telefone);
                setResponsavel(empresa.responsavel_pelo_cadastro);
            }
            catch (error) {
                console.log("Erro ao buscar empresa")
            }
        }
        fetchData();
    }, [])

    const [nome, setNome] = useState<string>();
    const [cnpj, setCnpj] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [sala, setSala] = useState<string>();
    const [telefone, setTelefone] = useState<string>();
    const [responsavel, setResponsavel] = useState<string>();
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
        // Só aceita números e no mínimo 1 dígito
        return /^\d+$/.test(sala);
    }

    async function atualizarEmpresa(e: React.FormEvent) {
        e.preventDefault();
        setEmailError("");
        setTelefoneError("");
        setCnpjError("");
        let erro = false;
        if (!validarEmail(email || "")) {
            setEmailError("Email inválido. Use o formato nome@exemplo.com");
            erro = true;
        }
        if (!validarTelefone(telefone || "")) {
            setTelefoneError("Telefone inválido. Use o formato (99) 99999-9999");
            erro = true;
        }
        if (!validarCnpj(cnpj || "")) {
            setCnpjError("CNPJ inválido. Use o formato 99.999.999/9999-99");
            erro = true;
        }

        if (erro) return;

        console.log(nome, cnpj, email, sala, telefone, responsavel);

        if (nome && cnpj && email && sala && telefone && responsavel) {
            const novaEmpresa = {
                nome: nome,
                cnpj: cnpj,
                email: email,
                sala: sala,
                telefone: telefone,
                responsavel_pelo_cadastro: responsavel
            };

            await putEmpresa(id, novaEmpresa);
            alert("Empresa atualizado com sucesso!")
            navegar("/empresas");
        }
    }

    return (
        <>
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
                            <input
                                className={`form-control ${cnpjError ? "is-invalid" : ""}`}
                                type="text"
                                placeholder="99.999.999/9999-99"
                                required
                                value={cnpj}
                                onChange={(e) => {
                                    let v = e.target.value.replace(/\D/g, "");
                                    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
                                    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                                    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
                                    v = v.replace(/(\d{4})(\d)/, "$1-$2");
                                    setCnpj(v);
                                }}
                            />
                            <div className="invalid-feedback">{cnpjError}</div>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Email</InputGroup.Text>
                            <Form.Control
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                                type="email"
                                placeholder="Informe o Email"
                                required
                                isInvalid={!!emailError}
                            />
                            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Sala</InputGroup.Text>
                            <Form.Control
                                value={sala}
                                onChange={(evt) => setSala(evt.target.value)}
                                type="text"
                                placeholder="Informe a SALA"
                                required

                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Telefone</InputGroup.Text>
                            <input
                                className={`form-control ${telefoneError ? "is-invalid" : ""}`}
                                type="text"
                                placeholder="(99) 99999-9999"
                                required
                                value={telefone}
                                onChange={(e) => {
                                    let v = e.target.value.replace(/\D/g, "");
                                    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
                                    v = v.replace(/(\d{5})(\d)/, "$1-$2");
                                    setTelefone(v);
                                }}
                            />
                            <div className="invalid-feedback">{telefoneError}</div>
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

                        <Box className="text-end">
                            <Button type="submit" style={{ backgroundColor: "#189995", border: "none" }}>
                                Salvar
                            </Button>
                        </Box>
                    </Form>
                </Row>
            </Paper>
        </>
    );
}
