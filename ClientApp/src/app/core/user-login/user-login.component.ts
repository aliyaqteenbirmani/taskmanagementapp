import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
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
    this.errorMessage = ''; // Reset error state
    this.isLoading = true; // Start loading

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if(response.token){
          localStorage.setItem('authToken',response.token);
          localStorage.setItem("userName",response.name);
        }
        
        this.router.navigate(['/dashboard']); // Redirect to dashboard (or home)
      },
      error: (err) => {
        console.error('Error occurred during login', err);
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      },
      complete: () => {
        this.isLoading = false; // Stop loading
      }
    });
  }

  // Optional: Reset form if needed
  resetForm(): void {
    this.loginData = { email: '', password: '' };
    this.errorMessage = '';
    this.isLoading = false;
  }
}