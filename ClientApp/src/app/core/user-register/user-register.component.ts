import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  user: User = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  passwordMismatch: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser(): void {
    this.passwordMismatch = false;
    this.errorMessage = ''; // Reset error state
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.isLoading = true; // Start loading
    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error occurred during registration', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      },
      complete: () => {
        this.isLoading = false; // Stop loading
      }
    });
  }

  // Optional: Reset form if you ever need it
  resetForm(): void {
    this.user = { fullName: '', email: '', password: '', confirmPassword: '' };
    this.passwordMismatch = false;
    this.errorMessage = '';
    this.isLoading = false;
  }
}