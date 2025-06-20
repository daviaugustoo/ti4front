import { FunctionsOutlined, Height } from "@mui/icons-material";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import fundo from "../imgs/bhtec-fundo.jpg"
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { login } from "../services/LoginService";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import Global from "../Global";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const navegar = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogin(evento: any) {
        evento.preventDefault()
        try {
            setLoading(true);
            const response = await login(email, senha)

            alert("Login realizado com sucesso")
            setLoading(false);
            navegar("/eventos")

        } catch (err) {
            const error = err as AxiosError;
            if (error.response && error.response.status === 401) {
                alert("Acesso negado: email ou senha incorretos")
            } else {
                alert("Erro ao fazer login")
                console.error(error)
            }
        }
    }

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${fundo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(8px)",
                    height: "100vh",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
            />
            <Container style={{
                position: "relative",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
            }}>
                <Col className="d-flex justify-content-center" sm={12} md={8} lg={6}>
                    <Box className="rounded p-5 shadow-lg w-100" style={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
                        <h1 className="text-center mb-4" style={{ fontWeight: "bold", color: "#1976d2" }}>
                            TrashMap
                        </h1>
                        <Form onSubmit={handleLogin}>
                            <InputGroup className="mb-4">
                                <InputGroup.Text><EmailIcon /></InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <InputGroup.Text><KeyIcon /></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="senha"
                                    placeholder="Digite sua senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <div className="d-grid">
                                <Button variant="primary" type="submit" size="lg">
                                    Entrar
                                </Button>
                            </div>
                        </Form>
                    </Box>
                </Col>
            </Container>
        </>
    );
}