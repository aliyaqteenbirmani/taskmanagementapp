import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
      path: 'register',
      loadComponent: () => import('./core/auth/register/register.component').then(m => m.RegisterComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
