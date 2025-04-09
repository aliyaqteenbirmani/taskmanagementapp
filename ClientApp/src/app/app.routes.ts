import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './core/user-register/user-register.component';
import { UserLoginComponent } from './core/user-login/user-login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './core/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'register', component: UserRegisterComponent }, 
  { path: 'login', component: UserLoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
