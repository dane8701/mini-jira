import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class mailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'charley.schroeder11@ethereal.email',
        pass: 'N3TK1B2nSejTr39KCK',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: 'hedrjo@gmail.com',
      to,
      subject,
      text,
    });
    console.log('Email sent: %s', info.messageId);
  }
}
