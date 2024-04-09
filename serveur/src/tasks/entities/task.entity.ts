import { ObjectId } from "mongoose";

export class Task {
    name: string;
    dateCreated: Date;
    state: ObjectId;
    createdBy: ObjectId;
    assignedTo: ObjectId;
    subTasks: ObjectId[];
    tags: ObjectId[];
}
