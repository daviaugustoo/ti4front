
import api from './api';


export async function getUsuario(id: number) {
    try {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;

    }
    catch (error) {
        console.error("Erro ao buscar usuario:", error);
    }
}

export async function getUsuarios() {
    try {
        const response = await api.get("/usuarios");
        return response.data;
    }
    catch (error) {
        console.error("Erro ao buscar usuarios:", error);
    }
}

export async function postUsuario(data: UsuarioPayload) {
    try {
        const response = await api.post("/usuarios", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar usuario:", error);
        throw error;
    }
}

export async function deleteUsuario(id: number) {
    try {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar usuario:", error);
    }
}

export async function putUsuario(id: number, data: UsuarioPayload) {
    try {
        const response = await api.put(`/usuarios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuario:", error);
    }
}
