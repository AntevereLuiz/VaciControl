import { Disease } from './../../disease/models/disease.model';
import { AgeGroups } from './AgeGroups.model';
import { Guid } from "guid-typescript";

export class Campaigns{
    constructor(
        public id?: Guid,
        public campaignName?: string,
        public disease?: Disease,
        public diseaseId?: Guid,
        public status?: boolean,
        public ageGroups?: AgeGroups[]        
    ){}
}