import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7226/api/User';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Register method
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, user);  // Adjust endpoint as needed
  }

  //Login method
  login(user: {email:string,password:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-user`, user);  // Adjust endpoint as needed
  }

  isAuthenticated(): boolean {
    // Check if a valid token exists in local storage (or wherever you're storing it)
    const token = localStorage.getItem('authToken');  // Replace 'authToken' with your actual token key
    
    // A simple check (you can implement more complex checks here)
    if (token) {
      return true;  // Token exists, consider the user authenticated
    } else {
      return false;  // No token, user is not authenticated
    }
  }
}
