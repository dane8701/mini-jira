import { Controller, Post, Body } from '@nestjs/common';
import { mailerService } from './mailer.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailerService: mailerService) {}

  @Post('send')
  async sendEmail(@Body() mail: { to: string; subject: string; text: string }) {
    console.log(mail)
    const { to, subject, text } = mail;
    await this.mailerService.sendEmail(to, subject, text);
    return { message: 'Email sent successfully' };
  }
}