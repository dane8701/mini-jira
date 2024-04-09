
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Project extends Document {
    @Prop({ required: true })
    title: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ type: Date, required: true })
    dateCreated: Date;
  
    @Prop({ type: Date, required: true })
    dateExpiration: Date;
  
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
    tags: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Status' })
    state: Types.ObjectId;
  }

  export const ProjectSchema = SchemaFactory.createForClass(Project);