import { ObjectId } from "mongoose";

export class CreateProjectDto {
    title: string;
    description: string;
    dateCreated: Date;
    dateExpiration: Date;
    tags: ObjectId[];
}
