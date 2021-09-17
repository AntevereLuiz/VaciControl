import { Guid } from "guid-typescript";

export class User{
    constructor(
        public id?: Guid,
        public nome?: string,
        public cpf?: string,
        public email?: string,
        public status?: boolean
    ){}
}