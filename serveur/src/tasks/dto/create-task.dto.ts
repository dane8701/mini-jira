import { ObjectId } from "mongoose";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
    name: string;
    dateCreated: Date;
    dateExpiration: Date;
    state: Status;
    createdBy: User;
    assignedTo: any;
    subTasks: ObjectId[];
    tags: ObjectId[];
    project: ObjectId;
}
