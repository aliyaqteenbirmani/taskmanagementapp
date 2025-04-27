import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7226/api/Task';

  constructor(private http: HttpClient) {}

  private mapTask(task: any): Task {
    return {
      ...task,
      status: this.mapStatus(task.status),
      createdDate: new Date(task.createdDate),
      modifiedDate: new Date(task.modifiedDate)
    };
  }

  private mapStatus(status: any): TaskStatus {
    switch (status) {
      case 'New':
      case 0:
        return TaskStatus.New;
      case 'InProgress':
      case 1:
        return TaskStatus.InProgress;
      case 'Completed':
      case 2:
        return TaskStatus.Completed;
      default:
        return TaskStatus.New; // Default to New if status is invalid
    }
  }

  getUserTask(): Observable<Task[]> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Task[]>(`${this.apiUrl}/get-task`, {headers})
  }

  getTasks(): Observable<Task[]> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Task[]>(`${this.apiUrl}/user-tasks?userId=${userId}`, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Task>(`${this.apiUrl}/add-task`, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Task>(`${this.apiUrl}/update-task`, task, { headers });
  }

  deleteTask(id: string): Observable<Task> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Task>(`${this.apiUrl}/delete-task?taskId=${id}`, { headers });
  }
}