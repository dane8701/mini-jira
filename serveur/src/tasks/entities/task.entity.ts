import { ObjectId } from "mongoose";

export class Task {
    name: string;
    dateCreated: Date;
    dateExpiration: Date;
    state: ObjectId;
    createdBy: ObjectId;
    assignedTo: any;
    subTasks: ObjectId[];
    tags: ObjectId[];
    project: ObjectId;
}