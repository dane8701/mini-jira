import { Component, OnInit, inject } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Task } from '../shared/models/interfaces';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskState } from '../shared/models/enums';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent {
  tasks!: Task[];
  userId: string = "";
  statuses!: SelectItem<TaskState>[];

  private route: ActivatedRoute;
  private taskSvc: TaskService;
  private messagerieSvc: MessageService;

  constructor() {
    this.route = inject(ActivatedRoute);
    this.taskSvc = inject(TaskService);
    this.messagerieSvc = inject(MessageService);
  }

    clonedTasks: { [s: string]: Task } = {};

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.userId = params['id'];
      });
      this.taskSvc.getTasksAssignedToUser(this.userId).subscribe((data) => (this.tasks = data));

      this.statuses = [
        { label: 'In Progress', value: TaskState.InProgress },
        { label: 'Completed', value: TaskState.Completed }
      ];
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
