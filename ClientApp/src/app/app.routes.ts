import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './core/user-register/user-register.component';
import { UserLoginComponent } from './core/user-login/user-login.component';
import { NgModule } from '@angular/core';
import { LandingComponent } from './core/landing/landing.component';
import { TaskComponent } from './core/task/task.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},  
  { path: 'login', component: UserLoginComponent},
  { path: 'register', component: UserRegisterComponent }, 
  { path: 'tasks', component: TaskComponent},
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{} 
