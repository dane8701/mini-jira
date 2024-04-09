import { ObjectId } from "mongoose";

export class CreateTaskDto {
    name: string;
    dateCreated: Date;
    state: string;
    createdBy: ObjectId;
    assignedTo: ObjectId
}
