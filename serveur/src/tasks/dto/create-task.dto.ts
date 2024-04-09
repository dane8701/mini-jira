import { ObjectId } from "mongoose";

export class CreateTaskDto {
    name: string;
    dateCreated: Date;
    state: ObjectId;
    createdBy: ObjectId;
    assignedTo: ObjectId;
    subTasks: ObjectId[];
    tags: ObjectId[];
}
