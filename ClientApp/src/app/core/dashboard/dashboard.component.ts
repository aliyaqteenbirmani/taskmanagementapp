import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItem } from '../../models/task-item.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string | null = localStorage.getItem('userName');
  tasks:TaskItem[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private taskService:TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error fetching tasks',err);
        this.errorMessage = 'Failed to load tasks. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}