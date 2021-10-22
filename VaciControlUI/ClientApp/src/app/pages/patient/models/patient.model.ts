import { Guid } from "guid-typescript";

export class Patient{
    constructor(
        public id?: Guid,
        public nome?: string,
        public cpf?: string,
        public dataNascimento?: any,
        public email?: string,
        public status?: boolean
    ){}
}