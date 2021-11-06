export class BatchFiler{
    constructor(
        public nome?: string,
        public fabricante?: string,
        public qtdeFrascos?: number,
        public vacina?: string,
        //NÃO TENHO CERTEZA DOS ABAIXO, ACHO QUE NÃO TERÁ FILTRO POR DATA
        public dataEntrada?: any,
        public dataValidade?: any
    ){}
}