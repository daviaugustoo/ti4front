import api from "./api";

export async function getResiduos() {
    try {
        const response = await api.get("/residuos");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar resíduos:", error);
    }
}

export async function putResiduo(id: number, data: ResiduoPayload) {
    try {
        const response = await api.put(`/residuos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar resíduo:", error);
    }
}

export async function getResiduoByEventoId(id: number) {
    try {
        const response = await api.get(`/residuosPorEventoId/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar resíduos por evento:", error);
    }
}