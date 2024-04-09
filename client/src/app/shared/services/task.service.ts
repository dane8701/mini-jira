import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../models/interfaces';
import { HttpClientApiService } from './http-client-api.service';

export enum TaskUrls {
    URL = 'http://localhost:3000/tasks',
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  taskSubject = new BehaviorSubject<{ taskId: string } | null>(null);


  constructor(private apiSvc: HttpClientApiService) { }

  add(task: Task) {
    this.apiSvc.post<Task, { success: boolean }>(TaskUrls.URL, task)?.subscribe(r => {
      if (r) {
        this.taskSubject.next({taskId: task._id});
      }
      else
        console.error(`Error during the creation of the task ${task.name}`);
    });
  }

  getTask(id: string): Observable<Task>{
    return this.apiSvc.get<Task>(TaskUrls.URL + "/" + id);
  }

  getAll(): Observable<Task[]> {
    return this.apiSvc.get<Task[]>(TaskUrls.URL);
  }

  getTasksAssignedToUser(userId: string): Observable<Task[]> {
    return this.apiSvc.get<Task[]>(TaskUrls.URL + "/assignedTo/" + userId);
  }

  update(task: Task) {
    this.apiSvc.patch<Task, Task>(TaskUrls.URL, task._id, task)?.subscribe(r => {
      if (r)
        this.taskSubject.next({taskId: task._id});
      else
        console.error(`Error during the modification of the task ${task.name}`);
    });
  }

  delete(task: Task) {
    return this.apiSvc.delete<Task>(TaskUrls.URL, task._id)?.subscribe(r => {
      if (r) {
        this.taskSubject.next({taskId: task._id});
      }
      else {
        console.error(`Error during task deletion ${task._id}`);
      }
    });
  }
}
