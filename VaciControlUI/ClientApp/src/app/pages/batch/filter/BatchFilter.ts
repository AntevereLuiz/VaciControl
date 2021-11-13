export class BatchFiler{
    constructor(
        //public nome?: string, NOME DA VACINA, ACHO QUE PODE APAGAR
        public vacina?: string,
        public fabricante?: string,
        public qtdeFrascos?: number,
        public dataValidade?: any
        //NÃO TENHO CERTEZA DOS ABAIXO, ACHO QUE NÃO TERÁ FILTRO POR DATAENTRADA
        //public dataEntrada?: any,
        
    ){}
}