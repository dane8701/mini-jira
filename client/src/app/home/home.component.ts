import { Component, OnInit, inject } from '@angular/core';
import { Task, User } from '../shared/models/interfaces';
import { TaskState } from '../shared/models/enums';
import { TaskService } from '../shared/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  
  constructor(private taskSvc: TaskService, private modalService: NgbModal){
    this.authSvc = inject(AuthService);
    this.formBuilder = inject(FormBuilder);
    this.translateSvc = inject(TranslateService);
    this.taskSvc.taskSubject.subscribe(task => this.getTasks());
  }

  listOfTask: Task[] = [];
  listOfUsers: User[] = [];
  state: TaskState = TaskState.Completed;

  ngOnInit(): void {
    this.authSvc.getUsers().subscribe(value => this.listOfUsers = value);

    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  getTasks(): void{
    this.taskSvc.getAll().subscribe(resultat => this.listOfTask = resultat);
  }

  onDeleteTask(task: Task) : void {
    this.taskSvc.delete(task);
  }

  onChangeStateTask(task: Task) : void {
    this.listOfTask.forEach(t => {
      if(JSON.stringify(t) === JSON.stringify(task)){
        if(t.state === TaskState.InProgress){
          t.state = TaskState.Completed;
          this.taskSvc.update(t);
        }
        else{
          t.state = TaskState.InProgress;
          this.taskSvc.update(t);
        }
      }
    })
  }

  openModal(task: Task){
    const modalRef = this.modalService.open(EditTaskModalComponent, { size: 'xs' });
    modalRef.componentInstance.onChangeTask(task);
    modalRef.componentInstance.taskUpdated.subscribe((task: Task) => {
      this.onTaskUpdated(task);
    });
  }

  onTaskUpdated(item: Task): void {
    this.taskSvc.update(item);
  }

  filterTask(state: string): void {
    this.getTasks();

    setTimeout(() => {
      if(state == 'In Progress')
        this.listOfTask = this.listOfTask.filter(task => task.state === TaskState.InProgress);
      else if(state == 'Completed')
        this.listOfTask = this.listOfTask.filter(task => task.state === TaskState.Completed);
      else
        this.getTasks(); // Default behaviour
    }, 150)

    console.log(this.listOfTask)
  }

  submitForm(){
    if (this.taskForm.valid) {
      const { taskName, userName } = this.taskForm.value;
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
            dateCreated: new Date(),
            state: TaskState.InProgress,
            createdBy: user._id,
            assignedTo: res._id
          } as Task;

          this.taskSvc.add(task);
        });
    
        this.taskForm.reset();
      }
    }
  }
}
