import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './schemas/tasks.schemas';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: 
  Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    return await task.save();
  }

  async findAll(): Promise<TaskDocument[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<TaskDocument> {
    return await this.taskModel.findById(id).exec();
  }

  async findAssignedTasks(userId: string): Promise<TaskDocument[]> {
    return await this.taskModel.find({ assignedTo: userId }).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument> {
    return await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, {new: true})
      .exec();
  }

  async remove(id: string): Promise<TaskDocument> {
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}
