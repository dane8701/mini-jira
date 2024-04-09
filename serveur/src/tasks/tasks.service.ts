import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
const { ObjectId } = require('mongodb');

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: 
  Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find()
                         .populate('state')
                         .populate('createdBy')
                         .populate('assignedTo')
                         .populate('subTasks')
                         .populate('tags')
                         .exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id)
                                     .populate('state')
                                     .populate('createdBy')
                                     .populate('assignedTo')
                                     .populate('subTasks')
                                     .populate('tags');
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true })
                                               .populate('state')
                                               .populate('createdBy')
                                               .populate('assignedTo')
                                               .populate('subTasks')
                                               .populate('tags');
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.taskModel.findByIdAndRemove(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }


  async findAssignedTasks(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ assignedTo: userId }).exec();
  }

  async addSubTask(taskId: string, subTaskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new Error('Task not found');
    const _id = ObjectId(subTaskId);
    task.subTasks.push(_id);
    return task.save();
  }

  async getTaskWithSubTasks(taskId: string): Promise<Task> {
    return this.taskModel.findById(taskId).populate('subTasks').exec();
  }
}
