// src/status/status.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './schemas/status.schemas';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const newStatus = new this.statusModel(createStatusDto);
    return newStatus.save();
  }

  async findAll(): Promise<Status[]> {
    return this.statusModel.find().exec();
  }

  async findOne(id: string): Promise<Status> {
    return this.statusModel.findById(id).exec();
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Status> {
    return this.statusModel.findByIdAndRemove(id).exec();
  }
}
