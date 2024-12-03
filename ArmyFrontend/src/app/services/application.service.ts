import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  applicationId: number;
  userId: number;
  vacancyId: number;
  applicationStatus: string; // Submitted, Shortlisted, Rejected, Selected
  submissionDate: Date;
  documentsSubmitted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5113/api/application';

  constructor(private http: HttpClient) { }

  // Get all applications
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  // Get application by ID
  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  // Get applications by UserId
  getApplicationsByUserId(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new application
  createApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  // Check if an application exists for the given userId and vacancyId
  checkApplicationExists(userId: number, vacancyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists?userId=${userId}&vacancyId=${vacancyId}`);
  }

  // Update an existing application
  updateApplication(id: number, updatedApplication: Application): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedApplication);
  }

  // Delete an application
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
