import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Status, Task, User } from '../models/interfaces';
import { AuthService } from '../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';
import { StatusService } from '../services/status.service';

@Pipe({
  name: 'taskDetails'
})
export class TaskDetailsPipe implements PipeTransform {

  constructor(private authSvc: AuthService, private translateSvc: TranslateService, private cdr: ChangeDetectorRef, private statusSvc: StatusService){}

  translatePipe = new TranslatePipe(this.translateSvc, this.cdr);
  result: string = "";

  transform(task: Task): Observable<string> {
    if (!task) return of(''); // If the task is null or undefined, return an empty string
    return this.authSvc.getUser(task.assignedTo._id).pipe(
      switchMap(user => {
        const assignedToStr = `Assigned To: ${user.fullName}`;
        const project = `For the project: ${task.project.title}`;
        return this.getState(task.state).pipe(
          switchMap(state => of(`${task.name} - ${state.name} - ${assignedToStr} - ${project}`))
        );
      })
    );
  }

  private getState(state: Status): Observable<Status> {
    return this.statusSvc.getAll().pipe(
      switchMap(statuses => {
        const foundState = statuses.find(s => s._id === state._id);
        return of(foundState || { _id: '', name: '', description: '' });  // Fallback to default empty status
      })
    );
  }
}
