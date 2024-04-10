import { Module } from '@nestjs/common';
import { mailerService } from './mailer.service';
import { MailController } from './mailer.controller'

@Module({
  controllers: [MailController],
  providers: [mailerService],
})
export class mailerModule {}