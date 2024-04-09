import { Injectable, inject } from '@angular/core';
import { User } from '../models/interfaces';
import { HttpClientApiService } from './http-client-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AuthUrls {
    REGISTER = 'http://localhost:3000/users/register',
    LOGIN = 'http://localhost:3000/users/login',
    URL = 'http://localhost:3000/users'
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private apiSvc: HttpClientApiService;
    private loggedIn: BehaviorSubject<boolean>;

  constructor() { 
    this.apiSvc = inject(HttpClientApiService);
    this.loggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem('user') ? true : false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  registerUser(user: User): Observable<User> | null {
    return this.apiSvc.post<User, User>(AuthUrls.REGISTER, user);
  }

  login(email: string, password: string): Observable<User | null> {
    const data = { email: email, password: password };
    return this.apiSvc.post<any, User | null>(AuthUrls.LOGIN, data);
  }

  getUsers(): Observable<User[]>{
    return this.apiSvc.get<User[]>(AuthUrls.URL);
  }

  getUser(id: string): Observable<User>{
    return this.apiSvc.get<User>(AuthUrls.URL + "/" + id);
  }

  logOut(): void {
    this.loggedIn.next(false);
  }

  logIn(): void {
    this.loggedIn.next(true);
  }
}
