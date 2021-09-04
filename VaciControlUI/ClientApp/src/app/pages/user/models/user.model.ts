export class User{
    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public email: string,
        public status: boolean
    ){}
}