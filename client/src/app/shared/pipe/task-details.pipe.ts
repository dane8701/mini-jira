import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Task, User } from '../models/interfaces';
import { TaskState } from '../models/enums';
import { AuthService } from '../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'taskDetails'
})
export class TaskDetailsPipe implements PipeTransform {

  constructor(private authSvc: AuthService, private translateSvc: TranslateService, private cdr: ChangeDetectorRef){}

  translatePipe = new TranslatePipe(this.translateSvc, this.cdr);
  result: string = "";

  transform(task: Task): Observable<string> {
    if (!task) return of(''); // If the task is null or undefined, return an empty string
    return this.authSvc.getUser(task.assignedTo).pipe(
      switchMap(user => {
        const assignedToStr = `Assigned To: ${user.fullName}`;
        const state = this.getStateString(task.state);
        return of(`${task.name} - ${state} - ${assignedToStr}`);
      })
    );
  }

  private getStateString(state: TaskState): string {
    switch (state) {
      case TaskState.InProgress:
        return this.translatePipe.transform('lbl-in-progress');
      case TaskState.Completed:
        return this.translatePipe.transform('lbl-completed');
      default:
        return 'Unknown';
    }
  }
}
