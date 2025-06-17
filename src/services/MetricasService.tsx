import api from "./api";

export async function relatorioMensal() {
    try {
        const response = await api.get("/relatorioMensal")
        return response.data;
    }
    catch (error) {
        console.log("Erro ao buscar o relatório mensal:", error);
    }
}

export async function graficoMediaResiduos() {
    try {
        const response = await api.get("/graficoMediaResiduos")
        return response.data;
    }
    catch (error) {
        console.log("Erro ao buscar o gráfico de média de resíduos:", error);
    }
}