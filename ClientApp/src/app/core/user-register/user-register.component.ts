import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  user: User={
    fullName: '',
    email: '',
    password: '',
    confirmPassword:''
  };

  constructor(private authService: AuthService, private router:Router){}

  registerUser(): void {
    if (this.user.password === this.user.confirmPassword) {
      this.authService.register(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Redirect user to login page after successful registration
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error occurred during registration', err);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Passwords do not match');
    }
  }

  // onSubmit() {
  //   console.log('User Registered:', this.user);
  //   // In the future, this will call the registration service.
  // }
}
