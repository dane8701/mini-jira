import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/users.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MailController } from 'src/mailer/mailer.controller';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailController: MailController) {}
  
  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = new this.userModel({
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: hashedPassword,
    });
    const mail = {
      to: newUser.email,
      subject: "Task Changes",
      text: 'Welcome on ReadMineV2'
    };
    this.mailController.sendEmail(mail);
    
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null; // User not found
    }

    const isPasswordMatch = await this.comparePasswords(password, user.password);
    if (!isPasswordMatch) {
      return null; // Passwords do not match
    }

    return user; // Return user if login successful
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Adjust this according to your needs

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
