import { Component, OnInit, inject } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Status, Task } from '../shared/models/interfaces';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskState } from '../shared/models/enums';
import { StatusService } from '../shared/services/status.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent {
  tasks!: Task[];
  userId: string = "";
  statuses: SelectItem<Status>[] = [];

  private route: ActivatedRoute;
  private taskSvc: TaskService;
  private statusSvc: StatusService;
  private messagerieSvc: MessageService;

  constructor() {
    this.route = inject(ActivatedRoute);
    this.taskSvc = inject(TaskService);
    this.messagerieSvc = inject(MessageService);
    this.statusSvc = inject(StatusService);
  }

    clonedTasks: { [s: string]: Task } = {};

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.userId = params['id'];
      });
      this.taskSvc.getTasksAssignedToUser(this.userId).subscribe((data) => (this.tasks = data));

      this.statusSvc.getAll().subscribe((data) => {
        data.forEach(state => {
          const stateToPush = {
            label: state.name,
            value: state
          }
          this.statuses.push(stateToPush)
        })
      });
    }

    onRowEditInit(task: Task) {
        this.clonedTasks[task._id as string] = { ...task };
    }

    onRowEditSave(task: Task) {
      this.taskSvc.update(task);
      this.messagerieSvc.add({ severity: 'success', summary: 'Success', detail: 'task is updated' });
    }

    onRowEditCancel(task: Task, index: number) {
        this.tasks[index] = this.clonedTasks[task._id as string];
        delete this.clonedTasks[task._id as string];
    }
}
