import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = new this.tagModel(createTagDto);
    return newTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async findOne(id: string): Promise<Tag> {
    return this.tagModel.findById(id).exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Tag> {
    return this.tagModel.findByIdAndRemove(id).exec();
  }
}
