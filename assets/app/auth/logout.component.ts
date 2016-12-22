import { Component } from '@angular/core';
//Service
import { AuthService } from './auth.service'
//Angular 2 Router to leave component in any line.
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
  <div class="col-md-8 col-md-offset-2">
    <button class="btn btn-danger" (click)="onLogout()">Logout</button>
  </div>
  `
})
export class LogoutComponent{
  constructor(private authService: AuthService, private router: Router){}
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth', 'signin']);
  }
}
