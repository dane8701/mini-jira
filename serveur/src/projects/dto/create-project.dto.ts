import { ObjectId } from "mongoose";

export class CreateProjectDto {
    title: string;
    description: string;
    priority: string;
    dateCreated: Date;
    dateExpiration: Date;
    tags: ObjectId[];
}
