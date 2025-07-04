import { Autocomplete, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { putUsuario, getUsuario } from "../services/UsuariosService";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import InputMask from 'react-input-mask';

export default function AtualizarUsuario() {

    const id = Number(useSearchParams()[0].get("id") as string)
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuario = await getUsuario(id)
                setUsuario(usuario)
                setNome(usuario.nome);
                setEmail(usuario.email);
                setTelefone(usuario.telefone);
                setSenha(usuario.password);
            }
            catch (error) {
                console.log("Erro ao buscar Usuario")
            }
        }
        fetchData();
    }, [])

    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [telefone, setTelefone] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [emailError, setEmailError] = useState<string>("");
    const [telefoneError, setTelefoneError] = useState<string>("");

    function validarEmail(email: string) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }
    function validarTelefone(telefone: string) {
        return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
    }

    async function atualizarUsuario(e: React.FormEvent) {
        e.preventDefault();
        setEmailError("");
        setTelefoneError("");
        let erro = false;
        if (!validarEmail(email || "")) {
            setEmailError("Email inválido. Use o formato nome@exemplo.com");
            erro = true;
        }
        if (!validarTelefone(telefone || "")) {
            setTelefoneError("Telefone inválido. Use o formato (99) 99999-9999");
            erro = true;
        }
        if (erro) return;

        console.log(nome, email, telefone, senha);

        if (nome && email && telefone && senha) {
            const novaUsuario = {
                nome: nome,
                email: email,
                password: senha,
                password_digest: senha,
                telefone: telefone,
            };

            await putUsuario(id, novaUsuario);
            alert("Usuario atualizado com sucesso!")
            navegar("/usuarios");
        }
    }

    return (
        <>
            <Paper>
                <Row>
                    <Form className="p-5" onSubmit={atualizarUsuario}>
                        <h1 className="text-center" style={{ color: "#189995" }}>Atualizar Usuario</h1>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setNome(evt.target.value)}
                                type="text"
                                placeholder="Informe o NOME"
                                defaultValue={usuario?.nome}
                                required
                            />
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
                            <InputGroup.Text>Senha</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setSenha(evt.target.value)}
                                type="text"
                                placeholder="Senha do Usuario"
                                defaultValue={usuario?.password}
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
