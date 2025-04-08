import { Routes } from '@angular/router';
import { UserRegisterComponent } from './core/user-register/user-register.component';
import { UserLoginComponent } from './core/user-login/user-login.component';
import { AuthGuard } from './auth.guard';  // Import the AuthGuard

export const appRoutes: Routes = [
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  
  // You can add more routes and protect them using the AuthGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
