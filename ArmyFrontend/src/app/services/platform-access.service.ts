import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlatformAccess {
  platformId: number;
  userId: number;
  deviceType: string;
  lastAccessDate: Date;
  preferredLanguage: string;
  username: string;
}


@Injectable({
  providedIn: 'root',
})
export class PlatformAccessService {
  private apiUrl = `http://localhost:5113/api/PlatformAccess`;

  constructor(private http: HttpClient) { }

  // Get all platform accesses
  getPlatformAccesses(): Observable<PlatformAccess[]> {
    return this.http.get<PlatformAccess[]>(this.apiUrl);
  }

  // Get a specific platform access by ID
  getPlatformAccessById(id: number): Observable<PlatformAccess> {
    return this.http.get<PlatformAccess>(`${this.apiUrl}/${id}`);
  }

  // Create a new platform access
  createPlatformAccess(platformAccess: PlatformAccess): Observable<PlatformAccess> {
    return this.http.post<PlatformAccess>(this.apiUrl, platformAccess, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Update an existing platform access
  updatePlatformAccess(id: number, platformAccess: PlatformAccess): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, platformAccess, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Delete a platform access
  deletePlatformAccess(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
