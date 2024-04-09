import { ObjectId } from "mongoose";

export class Project {
    title: string;
    description: string;
    dateCreated: Date;
    dateExpiration: Date;
    tags: ObjectId[];
    state: ObjectId;
}
