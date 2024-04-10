import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TagsModule } from './tags/tags.module';
import { StatusModule } from './status/status.module';
import { mailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://emeric:mlpMiZxCJbIslqsw@cluster0.nk5mxz2.mongodb.net/todo_list'),
    TasksModule,
    UsersModule,
    ProjectsModule,
    TagsModule,
    StatusModule,
    mailerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
