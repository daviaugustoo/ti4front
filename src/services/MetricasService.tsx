import api from "./api";

export async function relatorioMensal(mes: number, ano: number) {
    try {
        const params = mes && ano ? { mes, ano } : {};
        const response = await api.get("/relatorioMensal", { params })
        return response.data;
    }
    catch (error) {
        console.log("Erro ao buscar o relatório mensal:", error);
    }
}

export async function graficoMediaResiduos(mes: number, ano: number) {
    try {
        const params = mes && ano ? { mes, ano } : {};
        const response = await api.get("/graficoMediaResiduos", { params })
        return response.data;
    }
    catch (error) {
        console.log("Erro ao buscar o gráfico de média de resíduos:", error);
    }
}

export async function graficoMediaResiduosTotal() {
    try {
        const response = await api.get("/graficoMediaResiduosTotal")
        return response.data;
    }
    catch (error) {
        console.log("Erro ao buscar o gráfico de média de resíduos:", error);
    }
}