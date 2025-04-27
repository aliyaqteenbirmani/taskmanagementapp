import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  userName: string | null = '';
  userEmail: string | null = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = {
    id: '',
    title: '',
    description: '',
    status: TaskStatus.New,
    isDeleted: false,
    createdDate: new Date(),
    modifiedDate: new Date(),
    userId: ''
  };
  editingTask: Task | null = null;
  errorMessage: string = '';
  taskStatus = TaskStatus;
  taskStats: { new: number; inProgress: number; completed: number } = { new: 0, inProgress: 0, completed: 0 };
  filterStatus: TaskStatus | 'All' = 'All';
  sortBy: 'createdDate' | 'modifiedDate' = 'createdDate';
  notifications: { message: string; type: 'success' | 'error' }[] = [];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
    this.newTask.userId = localStorage.getItem('userId') || '';
    this.loadTasks();
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notifications.push({ message, type });
    setTimeout(() => {
      this.notifications.shift();
    }, 3000);
  }

  loadTasks(): void {
    this.taskService.getUserTask().subscribe({
      next: (tasks) => {
        console.log('Tasks returned from loadTasks:', tasks);
        this.tasks = tasks?.filter(t => t != null && 'status' in t) ?? [];
        this.updateTaskStats();
        this.applyFiltersAndSort();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.showNotification('Failed to load tasks.', 'error');
        console.error(err);
      }
    });
  }

  updateTaskStats(): void {
    this.taskStats.new = this.tasks.filter(t => t != null && 'status' in t && t.status === TaskStatus.New).length;
    this.taskStats.inProgress = this.tasks.filter(t => t != null && 'status' in t && t.status === TaskStatus.InProgress).length;
    this.taskStats.completed = this.tasks.filter(t => t != null && 'status' in t && t.status === TaskStatus.Completed).length;
  }

  applyFiltersAndSort(): void {
    let filtered = this.tasks;
    if (this.filterStatus !== 'All') {
      filtered = this.tasks.filter(t => t != null && 'status' in t && t.status === this.filterStatus);
    }

    this.filteredTasks = [...filtered].filter(t => t != null && 'status' in t).sort((a, b) => {
      const dateA = new Date(this.sortBy === 'createdDate' ? a.createdDate : a.modifiedDate);
      const dateB = new Date(this.sortBy === 'createdDate' ? b.createdDate : b.modifiedDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onFilterChange(status: TaskStatus | 'All'): void {
    this.filterStatus = status;
    this.applyFiltersAndSort();
  }

  onSortChange(sortBy: 'createdDate' | 'modifiedDate'): void {
    this.sortBy = sortBy;
    this.applyFiltersAndSort();
  }

  addTask(): void {
    if (!this.newTask.title.trim()) {
      this.errorMessage = 'Task title is required.';
      this.showNotification('Task title is required.', 'error');
      return;
    }

    this.newTask.createdDate = new Date();
    this.newTask.modifiedDate = new Date();

    this.taskService.addTask(this.newTask).subscribe({
      next: (task) => {
        console.log('Task returned from addTask:', task);
        if (task != null) {
          this.tasks.push(task);
          this.updateTaskStats();
          this.applyFiltersAndSort();
          this.resetForm();
          console.log('in the if statement');
          this.showNotification('Task added successfully!', 'success');
        } else {
          this.errorMessage = 'Task added, but failed to update the UI due to invalid task data.';
          this.showNotification('Task added, but UI update failed.', 'error');
          this.loadTasks();
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to add task. Please try again.';
        this.showNotification('Failed to add task.', 'error');
        console.error(err);
      }
    });
  }

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  updateTask(): void {
    if (!this.editingTask || !this.editingTask.title.trim()) {
      this.errorMessage = 'Task title is required.';
      this.showNotification('Task title is required.', 'error');
      return;
    }

    this.editingTask.modifiedDate = new Date();
    this.taskService.updateTask(this.editingTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.editingTask = null;
        this.updateTaskStats();
        this.applyFiltersAndSort();
        this.showNotification('Task updated successfully!', 'success');
      },
      error: (err) => {
        this.errorMessage = 'Failed to update task. Please try again.';
        this.showNotification('Failed to update task.', 'error');
        console.error(err);
      }
    });
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: (response) => {
          this.loadTasks();
          this.showNotification('Task deleted successfully!', 'success');
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete task. Please try again.';
          this.showNotification('Failed to delete task.', 'error');
          console.error(err);
        }
      });
    }
  }

  toggleStatus(task: Task): void {
    let newStatus: TaskStatus;
    switch (task.status) {
      case TaskStatus.New:
        newStatus = TaskStatus.InProgress;
        break;
      case TaskStatus.InProgress:
        newStatus = TaskStatus.Completed;
        break;
      case TaskStatus.Completed:
        newStatus = TaskStatus.New;
        break;
      default:
        newStatus = TaskStatus.New;
    }

    const updatedTask = { ...task, status: newStatus, modifiedDate: new Date() };
    this.taskService.updateTask(updatedTask).subscribe({
      next: (result) => {
        task.status = result.status;
        task.modifiedDate = result.modifiedDate;
        this.updateTaskStats();
        this.applyFiltersAndSort();
        this.showNotification(`Task status updated to ${this.getStatusText(newStatus)}!`, 'success');
      },
      error: (err) => {
        this.errorMessage = 'Failed to update task status. Please try again.';
        this.showNotification('Failed to update task status.', 'error');
        console.error(err);
      }
    });
  }

  getStatusText(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.New:
        return 'New';
      case TaskStatus.InProgress:
        return 'In Progress';
      case TaskStatus.Completed:
        return 'Completed';
      default:
        return '';
    }
  }

  updateStatus(newStatus: TaskStatus): void {
    if (this.editingTask) {
      this.editingTask.status = newStatus;
    } else {
      this.newTask.status = newStatus;
    }
  }

  resetForm(): void {
    this.newTask = {
      id: '',
      title: '',
      description: '',
      status: TaskStatus.New,
      isDeleted: false,
      createdDate: new Date(),
      modifiedDate: new Date(),
      userId: this.newTask.userId
    };
    this.errorMessage = '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}