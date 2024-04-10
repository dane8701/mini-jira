import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema()
export class Task extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    dateCreated: string;

    @Prop({required: true})
    dateExpiration: Date;

    @Prop({ type: Types.ObjectId, ref: 'Status' })
    state: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId; // Utilisateur qui a créé la tâche

    @Prop({ type: Types.ObjectId, ref: 'User' })
    assignedTo: Types.ObjectId; // Utilisateur à qui la tâche est assignée

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
    subTasks: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
    tags: Types.ObjectId[];
    
    @Prop({ type: Types.ObjectId, ref: 'Project' })
    project: Types.ObjectId; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);