import { Routes } from '@angular/router';
import { UserRegisterComponent } from './core/user-register/user-register.component';
// import { LoginComponent } from './core/user-login/user-login.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent }, // <- Changed this line
  // { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];
