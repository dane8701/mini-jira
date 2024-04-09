import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  selectedLocal: string = navigator.language;
  private formBuilder: FormBuilder;
  private authSvc: AuthService;
  private router: Router;
  private messagerieSvc: MessageService;
  private translateSvc: TranslateService;

  constructor() {
    this.formBuilder = inject(FormBuilder);
    this.authSvc = inject(AuthService);
    this.router = inject(Router);
    this.messagerieSvc = inject(MessageService);
    this.translateSvc = inject(TranslateService);
  }

  ngOnInit(): void {
    if(localStorage.getItem('userLocale')){
      this.selectedLocal = localStorage.getItem('userLocale')!;
      this.translateSvc.use(this.selectedLocal);
    }else{
      this.selectedLocal = this.translateSvc.defaultLang;
      this.translateSvc.use(this.selectedLocal);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully!', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authSvc.login(email, password)?.subscribe(
        response => {
          console.log(response);
          if(response !== null){
            this.authSvc.logIn();
            sessionStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem("userLocale", this.selectedLocal);
            this.router.navigate(['project']);
          } else {
            this.messagerieSvc.add({ severity: 'error', summary: 'Error', detail: 'email or password is wrong' });
          }
        },
        error => {
          console.log(error);
          this.messagerieSvc.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      )
    } else {
      console.log('Form has errors. Please check again.');
    }
  }

  onLocalChanged(local: string){
    localStorage.setItem("userLocale", local);
    this.translateSvc.use(local);
  }
}