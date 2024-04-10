import { Component, OnInit, inject } from '@angular/core';
import { Project, Status, Tag, Task, User } from '../shared/models/interfaces';
import { TaskState } from '../shared/models/enums';
import { TaskService } from '../shared/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from '../shared/services/status.service';
import { ProjectService } from '../shared/services/project.service';
import { TagService } from '../shared/services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private authSvc: AuthService;
  taskForm!: FormGroup;
  private formBuilder: FormBuilder;
  private translateSvc: TranslateService;
  private statusSvc: StatusService;
  private projectSvc: ProjectService;
  private tagSvc: TagService;
  
  constructor(private taskSvc: TaskService, private modalService: NgbModal){
    this.authSvc = inject(AuthService);
    this.formBuilder = inject(FormBuilder);
    this.translateSvc = inject(TranslateService);
    this.statusSvc = inject(StatusService);
    this.projectSvc = inject(ProjectService)
    this.tagSvc = inject(TagService)
    this.taskSvc.taskSubject.subscribe(task => this.getTasks());
  }

  listOfTask: Task[] = [];
  listOfUsers: User[] = [];
  listOfStatus: Status[] = [];
  listOfProjects: Project[] = [];
  listOfTags: Tag[] = [];

  ngOnInit(): void {

    this.authSvc.getUsers().subscribe(value => this.listOfUsers = value);
    this.statusSvc.getAll().subscribe(data => this.listOfStatus = data);
    this.projectSvc.findAll().subscribe(data => this.listOfProjects = data);
    this.tagSvc.findAll().subscribe(data => this.listOfTags = data);
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      dateExpiration: [new Date(), [Validators.required]],
      userName: ['', Validators.required],
      project: ['', Validators.required],
      tags: [[], Validators.required],
      subTasks: [[], Validators.required],
    });
  }

  isProgress(task: Task): boolean {
    const progressState = this.listOfStatus.find(el => el.name === "Progress");
    if (progressState && progressState._id === task.state._id) {
       return true;
    } else {
      return false;
    }
  }

  getTasks(): void{
    this.taskSvc.getAll().subscribe(resultat => this.listOfTask = resultat);
  }

  onDeleteTask(task: Task) : void {
    this.taskSvc.delete(task);
  }

  onChangeStateTask(task: Task) : void {
    const progressState = this.listOfStatus.find(el => el.name === "Progress");
    const completedState = this.listOfStatus.find(el => el.name === "Completed");

    if (!progressState || !completedState) {
      console.log('Required states not found in the state array');
      return;
    }

    this.listOfTask.forEach(t => {
      if(t._id === task._id){
        if(t.state._id === progressState?._id){
          t.state = completedState;
          this.taskSvc.update(t);
        }
        else{
          t.state = progressState;
          this.taskSvc.update(t);
        }
      }
    })
  }

  openModal(task: Task){
    const modalRef = this.modalService.open(EditTaskModalComponent, { size: 'xs' });
    modalRef.componentInstance.onChangeTask(task);
    modalRef.componentInstance.taskUpdated.subscribe((task: Task) => {
      console.log(task)
      this.onTaskUpdated(task);
    });
  }

  onTaskUpdated(item: Task): void {
    this.taskSvc.update(item);
  }

  filterTask(state: string): void {
    this.getTasks();

    const progressState = this.listOfStatus.find(el => el.name === "Progress");
    const completedState = this.listOfStatus.find(el => el.name === "Completed");

    if (!progressState || !completedState) {
      console.log('Required states not found in the state array');
      return;
    }

    setTimeout(() => {
      if(state == 'In Progress')
        this.listOfTask = this.listOfTask.filter(task => task.state._id === progressState._id);
      else if(state == 'Completed')
        this.listOfTask = this.listOfTask.filter(task => task.state._id === completedState._id);
      else
        this.getTasks(); // Default behaviour
    }, 150)

    console.log(this.listOfTask)
  }

  filterTaskByProject(project: Project): void {
    this.getTasks();
    setTimeout(() => {
      this.listOfTask = this.listOfTask.filter(task => task.project._id === project._id);
    }, 150)
  }

  filterTaskByTag(tag: Tag): void {
    this.getTasks();
    setTimeout(() => {
      this.listOfTask = this.listOfTask.filter(task => {
        return task.tags.some(t => t._id === tag._id);
      });
    }, 150);
  }

  submitForm(){
    const progressState = this.listOfStatus.find(el => el.name === "Progress");
    const completedState = this.listOfStatus.find(el => el.name === "Completed");

    if (!progressState || !completedState) {
      console.log('Required states not found in the state array');
      return;
    }

    if (this.taskForm.valid) {
      const { taskName, dateExpiration, userName, project, tags, subTasks } = this.taskForm.value;
      console.log('Form submitted successfully!', this.taskForm.value);
      // Retrieve the item from session storage
      const storedItem = sessionStorage.getItem('user');

      if (storedItem) {
        // Parse the stored item from string to object
        const parsedItem: any = JSON.parse(storedItem); // Use 'any' as it might not strictly adhere to the User interface
        // Convert the parsed item to match the User interface
        const user: User = {
          _id: parsedItem._id,
          fullName: parsedItem.fullName,
          email: parsedItem.email,
          password: parsedItem.password,
          __v: parsedItem.__v
        };

        this.authSvc.getUser(userName).subscribe(res => {

          let task = {
            name: taskName,
            dateExpiration: dateExpiration,
            dateCreated: new Date(),
            state: progressState,
            createdBy: user,
            assignedTo: res,
            project: project,
            tags: tags,
            subTasks: subTasks
          } as Task;

          this.taskSvc.add(task);
        });
    
        this.taskForm.reset();
      }
    }
  }
}
