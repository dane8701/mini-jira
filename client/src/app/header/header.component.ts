import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: Router;
  authSvc: AuthService;
  currentUser?: User;
  constructor(){
    this.router = inject(Router);
    this.authSvc = inject(AuthService);
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!) as User;
  }
  
  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
