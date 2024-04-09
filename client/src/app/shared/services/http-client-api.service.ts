import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientApiService {

  constructor(private http: HttpClient) {
  }

  get<TResult>(url: string, params?: { [param: string]: string | number | boolean }) {
    return this.http.get(url, { params: params }).pipe(map(res => res as TResult));
  }

  post<TRequestData, TResult>(url: string, data: TRequestData) : Observable<TResult> {
    let observable;
    if (data)
      observable = this.http.post(url, data);
    else {
      throw new Error('payload data is null');
    }

    return observable.pipe(
      map(data => {
        return data as TResult;
      }));
  }

  patch<TRequestData, TResult>(url: string, params: string | number | boolean, data: TRequestData) {
    let observable;
    if (data)
      observable = this.http.patch(url+ '/' + params, data);
    else {
      console.error('payload data is null');
      return null;
    }

    return observable.pipe(
      map(data => {
        return data as TResult;
      }));
  }

  delete<TResult>(url: string, params: string | number | boolean ) {
    return this.http.delete(url + '/' + params).pipe(map(res => res as TResult));
  }
}
