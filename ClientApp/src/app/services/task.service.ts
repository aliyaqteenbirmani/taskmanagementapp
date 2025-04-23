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
    const token = localStorage.getItem('authToken')?.trim();
    if(!token)
    {
      console.error('No token found in localStorage');
      throw new Error('No token found');
    }
    console.log('Raw token from localStorage:', token);
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);

    console.log('Authorization header:', headers.get('Authorization'));
    return this.http.get<TaskItem[]>(this.apiUrl,{headers});
  }
}
