import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/interfaces';

export enum TagsUrls {
  URL = 'http://localhost:3000/tags',
}

@Injectable({
  providedIn: 'root'
})

export class TagService {

  constructor(private http: HttpClient) { }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(TagsUrls.URL, tag);
  }

  findAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TagsUrls.URL);
  }

  findOne(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${TagsUrls.URL}/${id}`);
  }

  update(id: string, tag: Tag): Observable<Tag> {
    return this.http.patch<Tag>(`${TagsUrls.URL}/${id}`, tag);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${TagsUrls.URL}/${id}`);
  }
}
