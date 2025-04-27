import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userName', response.name);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userEmail', this.loginData.email); // Store email
          setTimeout(() => {
            console.log('Attempting to redirect to /tasks');
            this.router.navigate(['/tasks']).then(success => {
              console.log('Navigation to /tasks successful:', success);
              if (!success) {
                console.log('Navigation failed, current route:', this.router.url);
              }
            });
          }, 100);
        }
      },
      error: (err) => {
        console.error('Error occurred during login', err);
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.loginData = { email: '', password: '' };
    this.errorMessage = '';
    this.isLoading = false;
  }
}