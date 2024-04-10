import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskState } from 'src/app/shared/models/enums';
import { Project, Status, Tag, Task } from 'src/app/shared/models/interfaces';
import { ProjectService } from 'src/app/shared/services/project.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { TagService } from 'src/app/shared/services/tag.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  @Output() taskUpdated = new EventEmitter<Task>();
  currentTask!: Task;
  TaskStates: Status[] = [];
  listOfProjects: Project[] = [];
  listOfTags: Tag[] = [];
  listOfTasks: Task[] = [];

  constructor(public activeModal: NgbActiveModal, private statusSvc: StatusService, private projectSvc: ProjectService, private tagSvc: TagService, private taskSvc: TaskService){}

  ngOnInit(): void {
    console.log(this.currentTask.dateExpiration)
    this.statusSvc.getAll().subscribe(data => this.TaskStates = data);
    this.projectSvc.findAll().subscribe(data => this.listOfProjects = data);
    this.tagSvc.findAll().subscribe(data => this.listOfTags = data);
    this.taskSvc.getAll().subscribe(data => this.listOfTasks = data);
  }

  onChangeTask(task: Task): void{
    this.currentTask = JSON.parse(JSON.stringify(task));
  }

  onValidateUpdate(): void {
    this.taskUpdated.emit(this.currentTask);
    this.activeModal.close();
  }
}
