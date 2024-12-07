import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5113/api/User';
  private profileUrl = 'http://localhost:5113/api/User/me';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  async storeToken(token: string, username: string): Promise<void> {
    try {
      const user = await this.getUserByUsername(username).toPromise();
      localStorage.setItem('username', username);
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
    } catch (error) {
      console.error('Error fetching user by username:', error);
    }
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token); // You need to implement decodeToken
      return decodedToken?.roles || [];
    }
    return [];
  }

  // Example method to decode the JWT token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    const decoded = atob(payload); // Decode base64
    return JSON.parse(decoded); // Return parsed JSON payload
  }

  // Check if the user has a specific role
  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/username/${username}`);
  }

  getToken(): string | null {
    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('jwtToken');
    }
    // return localStorage.getItem('jwtToken');
    return token;
  }

  getUserDetails(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.profileUrl, { headers });
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
