export class UserFilter{
    constructor(
        public nome?: string,
        public cpf?: string,
        public email?: string,
        public status?: boolean
    ){}
}