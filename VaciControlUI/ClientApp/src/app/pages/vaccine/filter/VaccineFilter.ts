export class VaccineFilter{
    constructor(
        public nome?: string,
        public doenca?: string,
        //DÚVIDA NO ABAIXO, FILTRO DE DOSES?
        public qtdeDoses?: number
    ){}
}