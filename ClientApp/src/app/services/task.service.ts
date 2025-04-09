import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/task-item.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7226/api/Task/get-task';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskItem[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<TaskItem[]>(this.apiUrl,{headers});
  }
}
