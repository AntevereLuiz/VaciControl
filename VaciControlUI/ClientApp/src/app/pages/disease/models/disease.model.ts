import { Guid } from "guid-typescript";

export class Disease{
    constructor(
        public id?: Guid,
        public nome?: string
    ){}
}