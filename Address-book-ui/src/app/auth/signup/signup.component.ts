import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  password: string;
  email: string;
  isLoading = false;
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    const values = this.myForm.value;
    this.isLoading = true;
    this.reset();
    this.subscription = this.authService
      .signup(values.name, values.email, values.password)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
          this.myForm.reset();
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
