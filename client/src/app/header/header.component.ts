import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  router: Router;
  authSvc: AuthService;
  currentUser?: User;
  private isLoggedInSub?: Subscription;
  
  constructor(){
    this.router = inject(Router);
    this.authSvc = inject(AuthService);
  }

  ngOnInit(): void {
    this.isLoggedInSub = this.authSvc.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.currentUser = undefined;
      }
      else{
        this.currentUser = JSON.parse(sessionStorage.getItem('user')!) as User;
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSub?.unsubscribe();
  }
  
  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
