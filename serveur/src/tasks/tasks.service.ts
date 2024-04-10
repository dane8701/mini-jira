import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
const { ObjectId } = require('mongodb');
import { UsersController } from 'src/users/users.controller';
import { MailController } from 'src/mailer/mailer.controller';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private usersController: UsersController,
    private mailController: MailController
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    console.log(newTask)
    const mail = {
      to: createTaskDto.assignedTo.email,
      subject: "A new task has been assigned to you",
      text: "The task " + createTaskDto.name + " has been assigned to you !"
    }
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
    const user = await this.usersController.findOne(updateTaskDto.assignedTo._id);
    const mail = {
      to: user.email,
      subject: "Task Changes",
      text: 'Your task status changes to ' + updateTaskDto.state.name
    }
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true })
      .populate('state')
      .populate('createdBy')
      .populate('assignedTo')
      .populate('subTasks')
      .populate('tags');
    this.mailController.sendEmail(mail)
    // if (!updatedTask) {
    //   throw new NotFoundException(`Task with ID ${id} not found`);
    // }
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.taskModel.findByIdAndRemove(id);
    const mail = {
      to: task.assignedTo.email,
      subject: "Your task has been deleted",
      text: "The task " + task.name + " has been deleted !"
    };
    this.mailController.sendEmail(mail);
     
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }


  async findAssignedTasks(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ "assignedTo._id": userId }).exec();
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
