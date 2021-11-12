
import { Guid } from "guid-typescript";
import { Disease } from "../../disease/models/disease.model";

export class Vaccine{
    constructor(
        public id?: Guid,
        public name?: string,
        public diseaseId?: Guid,
        public disease?: Disease,
        public amount?: number,
        public intervaloProximaDose?: number
    ){}
}