import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = localStorage.getItem('userName');
    if (this.isLoggedIn) {
      console.log('User is logged in, redirecting to /tasks from landing page');
      this.router.navigate(['/tasks']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
  }
}