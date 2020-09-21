import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedin: boolean;
  show = false;
  subscription: Subscription;
  constructor(private authSerivce: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authSerivce.user.subscribe((user: User) => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }
  onLogOut() {
    localStorage.removeItem('user');
    this.authSerivce.user.next(null);
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
