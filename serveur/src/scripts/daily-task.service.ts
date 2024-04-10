import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { MailController } from '../mailer/mailer.controller';
import { TasksController } from '../tasks/tasks.controller';

@Injectable()
export class sendMailTaskExpiry implements OnModuleInit {
  onModuleInit() {
    this.scheduleDailyTask();
  }

  private mailController: MailController
  private tasksController: TasksController

  private scheduleDailyTask() {
    const job = new CronJob('0 1 * * *', async () => {
      let tasks = await this.tasksController.findAll()
      tasks.forEach(async element => {
        if(element.dateExpiration.getDate() > Date.now()) {
          let mail = { to: element.assignedTo.email, subject: "TACHE EXPIRATION", text: "Votre tâche arrive en expiration" }
          await this.mailController.sendEmail(mail)
        }
      });
    });
    job.start();
  }
}
