
import { Guid } from "guid-typescript";
import { Disease } from "../../disease/models/disease.model";

export class Vaccine{
    constructor(
        public id?: Guid,
        public nome?: string,
        public doenca?: Disease,
        public qtdeDoses?: number,
        public intervaloProximaDose?: number
    ){}
}