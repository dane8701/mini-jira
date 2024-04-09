import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';

@Injectable()
export class sendMailTaskExpiry implements OnModuleInit {
  onModuleInit() {
    this.scheduleDailyTask();
  }

  private scheduleDailyTask() {
    const job = new CronJob('0 1 * * *', () => {
      // Mettre le code mailjet

      console.log('Exécuter le code quotidien à 1h du matin...');
    });

    job.start();
  }
}
