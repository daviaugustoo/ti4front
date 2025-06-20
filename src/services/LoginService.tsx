import api from "./api";

export async function login(email: string, password: string) {
    try {
        const response = await api.post("/login", { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer o login: ", error);
        throw error;
    }
}

export async function getPerfil() {
    try {
        const token = localStorage.getItem('token')
        const response = await api.get("/perfil", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        console.error("Erro ao obter perfil: ", error);
    }
}