import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskState } from 'src/app/shared/models/enums';
import { Task } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {
  @Output() taskUpdated = new EventEmitter<Task>();
  currentTask!: Task;
  TaskStates: TaskState[] = Object.values(TaskState);

  constructor(public activeModal: NgbActiveModal){}

  onChangeTask(task: Task): void{
    this.currentTask = JSON.parse(JSON.stringify(task));
  }

  onValidateUpdate(): void {
    this.taskUpdated.emit(this.currentTask);
    this.activeModal.close();
  }
}
