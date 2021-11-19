import { Guid } from "guid-typescript";

export class AgeGroups{
    constructor(
        public id?: Guid,
        public minAge?: number,
        public maxAge?: number,
        public dateIni?: any,
        public dateFim?: any,
        public campaignId?: Guid
    ){}
}