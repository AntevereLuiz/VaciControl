export class PatientFilter{
    constructor(
        public nome?: string,
        public cpf?: string,
        public dataNascimento?: string,
        public email?: string,
        public status?: boolean
    ){}
}