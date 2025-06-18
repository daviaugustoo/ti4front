import api from "./api";

export async function getEventosPorDataEIdEmpresa(empresaId: number, mes?: number, ano?: number,) {
    try {
        const params = mes && ano ? { mes, ano } : {};
        const response = await api.get(`/eventosPorDataEIdEmpresa/${empresaId}`, { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
    }
}

export async function getEventosPorData(mes?: number, ano?: number,) {
    try {
        const params = mes && ano ? { mes, ano } : {};
        const response = await api.get(`/eventosPorData`, { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
    }
}

export async function getEventos() {
    try {
        const response = await api.get("/eventos");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
    }
}

export async function getEvento(id: number) {
    try {
        const response = await api.get(`/eventos/${id}`)
        return response.data
    }
    catch (error) {
        console.log("Erro ao buscar evento: ", error)
    }
}

export async function postEvento(data: EventoPayload) {
    try {
        const response = await api.post("/eventos", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar evento:", error);
    }
}

export async function putEvento(id: number, data: EventoPayload) {
    try {
        const response = await api.put(`/eventos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
    }
}

export async function deleteEvento(id: number) {
    try {
        const response = await api.delete(`/eventos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar evento:", error);
    }
}

export async function getEventosPorEmpresaId(empresaId: string) {
    try {
        const response = await api.get(`/eventosPorEmpresaId/${empresaId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar eventos por empresa:", error);
    }
}