import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/tasks.schemas';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { MailController } from '../mailer/mailer.controller';
import { mailerModule } from '../mailer/mailer.module';
import { mailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema}]), UsersModule, mailerModule],
  controllers: [TasksController],
  providers: [TasksService, UsersController, MailController, mailerService],
  exports: [TasksService]
})
export class TasksModule {}
