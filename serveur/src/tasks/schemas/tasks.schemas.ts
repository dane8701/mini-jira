import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    dateCreated: string;

    @Prop({required: true})
    state: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId;; // Utilisateur qui a créé la tâche

    @Prop({ type: Types.ObjectId, ref: 'User' })
    assignedTo: Types.ObjectId;; // Utilisateur à qui la tâche est assignée
}

export const TaskSchema = SchemaFactory.createForClass(Task);