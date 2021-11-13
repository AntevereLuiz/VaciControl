import { Guid } from "guid-typescript";
import { Manufacturer } from "../../manufacturers/models/manufacturer.model";
import { Vaccine } from "../../vaccine/models/vaccine.model";

export class Batch{
    constructor(
        public id?: Guid,
        //public nome?: string, NOME DA VACINA, ACHO QUE PODE APAGAR
        public vacina?: Vaccine,
        public lote?: string,
        public fabricante?: Manufacturer,
        public qtdeFrascos?: number,
        public dataEntrada?: any,
        public dataValidade?: any,
        public aplicacoesPorFrasco?: number,
        public totalAplicacoesPossiveis?: number
    ){}
}