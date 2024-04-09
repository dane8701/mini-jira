import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskState } from 'src/app/shared/models/enums';
import { Status, Task } from 'src/app/shared/models/interfaces';
import { StatusService } from 'src/app/shared/services/status.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  @Output() taskUpdated = new EventEmitter<Task>();
  currentTask!: Task;
  TaskStates: Status[] = [];

  constructor(public activeModal: NgbActiveModal, private statusSvc: StatusService){}

  ngOnInit(): void {
    console.log(this.currentTask)
    this.statusSvc.getAll().subscribe(data => this.TaskStates = data);
  }

  onChangeTask(task: Task): void{
    this.currentTask = JSON.parse(JSON.stringify(task));
  }

  onValidateUpdate(): void {
    this.taskUpdated.emit(this.currentTask);
    this.activeModal.close();
  }
}
