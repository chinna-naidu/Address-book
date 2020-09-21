import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpService } from '../http.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpService, private router: Router) {}

  login(email: string, password: string) {
    return this.http.login(email, password);
  }

  signup(name: string, email: string, password: string) {
    return this.http.signup(name, email, password);
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('autoLogin');
    if (!user) {
      return this.user.next(null);
    }
    this.user.next(user);
  }
}
