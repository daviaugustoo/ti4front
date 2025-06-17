import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import fundo from "../imgs/bhtec-fundo.jpg";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import api from "../services/api";
import { useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const navigate = useNavigate(); // Hook do React Router para redirecionar

    function handleLogin(event: any) {
        event.preventDefault(); 
    
        const email = event.target.email.value;
        const senha = event.target.senha.value; 
    
        api.post("/api/login", { email, senha }) // Envia apenas email e senha
            .then(res => {
                const { nivelAcesso } = res.data;
    
                if (nivelAcesso === "admin") {
                    navigate("/painel-bhtec");
                } else {
                    alert("Login inválido ou tipo de usuário incorreto.");
                }
            })
            .catch(err => {
                alert("Login inválido ou erro na comunicação com o servidor.");
                console.error(err);
            });
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
                            Trashmap
                        </h1>
                        <Form onSubmit={handleLogin}>
                            <InputGroup className="mb-4">
                                <InputGroup.Text><EmailIcon /></InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-4">
                                <InputGroup.Text><KeyIcon /></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="senha"
                                    placeholder="Digite sua senha"
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