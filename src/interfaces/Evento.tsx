
interface Evento {
    id: number;
    nome: string;
    data_inicio: Date;
    data_fim: Date;
    empresa_id: number;
    organizador: string;
    quantia_de_pessoas: number;
    observacoes: Text;
    responsavel_pelo_cadastro: string;
}
