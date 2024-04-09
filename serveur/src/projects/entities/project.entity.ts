import { ObjectId } from "mongoose";

export class Project {
    title: string;
    description: string;
    priority: string;
    dateCreated: Date;
    dateExpiration: Date;
    tags: ObjectId[];
    state: ObjectId;
}
