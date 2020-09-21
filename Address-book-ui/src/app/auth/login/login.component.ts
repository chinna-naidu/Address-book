import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  email: string;
  password: string;
  isLoading = false;
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
      ]),
    });
  }

  onSubmit() {
    const values = this.myForm.value;
    this.isLoading = true;
    this.reset();
    this.subscription = this.authService
      .login(values.email, values.password)
      .subscribe(
        (data: User) => {
          this.authService.user.next(data);
          console.log('login');
          localStorage.setItem('user', JSON.stringify(data));
          this.myForm.reset();
          this.isLoading = false;
          this.router.navigate(['/list']);
        },
        (errorResponse) => {
          this.isLoading = false;
          this.setErrors(errorResponse);
        }
      );
  }
  isValidControl(control: string) {
    return !this.myForm.get(control).valid && this.myForm.get(control).touched;
  }
  setErrors(errorResponse) {
    if (errorResponse.error.field === 'email') {
      this.email = errorResponse.error.message;
    } else if (errorResponse.error.field === 'password') {
      this.password = errorResponse.error.message;
    }
  }
  reset() {
    this.email = null;
    this.password = null;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
