import { Guid } from "guid-typescript";

export class Manufacturer{
    constructor(
        public id?: Guid,
        public nome?: string,
        public cnpj?: string,
        public email?: string
    ){}
}