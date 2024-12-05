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

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/username/${username}`);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
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
