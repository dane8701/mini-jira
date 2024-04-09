// src/projects/project.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/projects.schemas';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('tags').populate('state').exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).populate('tags').populate('state').exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).populate('tags').populate('state');
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async remove(id: string): Promise<Project> {
    const project = await this.projectModel.findByIdAndRemove(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }
}
