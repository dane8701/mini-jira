import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../models/interfaces';
import { HttpClientApiService } from './http-client-api.service';

export enum StatusUrls {
    URL = 'http://localhost:3000/status',
}

@Injectable({
  providedIn: 'root'
})

export class StatusService {
  StatusSubject = new BehaviorSubject<{ statusId: string } | null>(null);


  constructor(private apiSvc: HttpClientApiService) { }

  add(status: Status) {
    this.apiSvc.post<Status, { success: boolean }>(StatusUrls.URL, status)?.subscribe(r => {
      if (r) {
        this.StatusSubject.next({statusId: status._id});
      }
      else
        console.error(`Error during the creation of the status ${status.name}`);
    });
  }

  getStatus(id: string): Observable<Status>{
    return this.apiSvc.get<Status>(StatusUrls.URL + "/" + id);
  }

  getAll(): Observable<Status[]> {
    return this.apiSvc.get<Status[]>(StatusUrls.URL);
  }

  update(status: Status) {
    this.apiSvc.patch<Status, Status>(StatusUrls.URL, status._id, status)?.subscribe(r => {
      if (r)
        this.StatusSubject.next({statusId: status._id});
      else
        console.error(`Error during the modification of the status ${status.name}`);
    });
  }

  delete(status: Status) {
    return this.apiSvc.delete<Status>(StatusUrls.URL, status._id)?.subscribe(r => {
      if (r) {
        this.StatusSubject.next({statusId: status._id});
      }
      else {
        console.error(`Error during status deletion ${status._id}`);
      }
    });
  }
}
