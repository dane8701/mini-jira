import { Module } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { ProjectSchema } from './schemas/projects.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])
  ],
  controllers: [ProjectsController],
  providers: [ProjectService]
})
export class ProjectsModule {}
