
export class Movimentacao {
    id: string
    nome: string
    descricao: string
    dataPagamento: string
    valor: string
    idUsuario: string
    dataVencimento: string
    mesAno: string
    pago: boolean
    credito: boolean
    vencimento: string
}

export function movimentacaoDoBanco(firebaseData: Record<string, any> | null): Movimentacao[] {
    if (!firebaseData) {
        return [];
    }

    return Object.keys(firebaseData).map(key => ({
        id: key,
        ...firebaseData[key]  // Copia os outros dados da anotação
    }));
}