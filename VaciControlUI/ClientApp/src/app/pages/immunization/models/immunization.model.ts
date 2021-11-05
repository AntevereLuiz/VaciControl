// import { Campaigns } from './../../ageGroupsAndCampaigns/models/Campaigns.model';
import { Guid } from "guid-typescript";

export class Immunization{
    constructor(
        public id?: Guid,
        public cpfPaciente?: string,
        public status?: boolean,
        public idCampanha?: number,        
        public idVacina?: number,        
        public idLote?: number,        
        public dose?: number,               
        // public vacina?: Vaccine,
        // public lote?: Batch,
        // public campanha?: Campaigns,
    ){}
}