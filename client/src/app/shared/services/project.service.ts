import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/interfaces';
import { Observable } from 'rxjs';

export enum ProjectsUrls {
  URL = 'http://localhost:3000/projects',
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(ProjectsUrls.URL, project);
  }

  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(ProjectsUrls.URL);
  }

  findOne(id: string): Observable<Project> {
    return this.http.get<Project>(`${ProjectsUrls.URL}/${id}`);
  }

  update(id: string, project: Project): Observable<Project> {
    return this.http.patch<Project>(`${ProjectsUrls.URL}/${id}`, project);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${ProjectsUrls.URL}/${id}`);
  }
}
