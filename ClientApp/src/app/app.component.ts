import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRegisterComponent } from './core/user-register/user-register.component';
@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorage.clear();
    console.log('AppComponent: Cleared localStorage on start')
  }
  title = 'ClientApp';
}
