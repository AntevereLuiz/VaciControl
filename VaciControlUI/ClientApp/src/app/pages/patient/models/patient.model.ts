import { Guid } from "guid-typescript";

export class Patient{
    constructor(
        public id?: Guid,
        public nome?: string,
        public cpf?: string,
        public dataNascimento?: Date,
        public email?: string,
        public status?: boolean
    ){}
}