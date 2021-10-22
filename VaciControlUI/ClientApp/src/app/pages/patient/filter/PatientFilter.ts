export class PatientFilter{
    constructor(
        public nome?: string,
        public cpf?: string,
        public dataNascimento?: Date,
        public email?: string,
        public status?: boolean
    ){}
}