import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/users.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { mailerModule } from '../mailer/mailer.module';
import { mailerService } from '../mailer/mailer.service';
import { MailController } from '../mailer/mailer.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), mailerModule],
  controllers: [UsersController],
  providers: [UsersService, MailController, mailerService],
  exports: [UsersService]
})
export class UsersModule {}
