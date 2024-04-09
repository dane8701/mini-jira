import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/validators/password-match.directive';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/interfaces';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
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
      this.translateSvc.use(localStorage.getItem('userLocale')!);
    }else{
      this.translateSvc.use(this.translateSvc.defaultLang);
    }
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted successfully!', this.registerForm.value);
      const data = { ...this.registerForm.value };
      delete data.confirmPassword;
      this.authSvc.registerUser(data as User)?.subscribe(
        response => {
          console.log(response);
          this.messagerieSvc.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
          this.router.navigate(['login'])
        },
        error => {
          console.log(error);
          this.messagerieSvc.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      )
    } else {
      // Handle form errors if needed
      console.log('Form has errors. Please check again.');
    }
  }
}
