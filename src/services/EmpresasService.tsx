
import api from './api';


export async function getEmpresa(id: number) {
    try {
        const response = await api.get(`/empresas/${id}`);
        return response.data;

    }
    catch (error) {
        console.error("Erro ao buscar empresa:", error);
    }
}

export async function getEmpresas() {
    try {
        const response = await api.get("/empresas");
        return response.data;
    }
    catch (error) {
        console.error("Erro ao buscar empresas:", error);
    }
}

export async function postEmpresa(data: EmpresaPayload) {
    try {
        const response = await api.post("/empresas", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar empresa:", error);
        throw error;
    }
}

export async function deleteEmpresa(id: number) {
    try {
        const response = await api.delete(`/empresas/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar empresa:", error);
    }
}

export async function putEmpresa(id: number, data: EmpresaPayload) {
    try {
        const response = await api.put(`/empresas/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar empresa:", error);
    }
}

export async function buscaEmpresaPorNome(nome: String) {
    try {
        const response = await api.get(`/buscaEmpresaPorNome/${nome}`);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao buscar empresas:", error);
    }
}