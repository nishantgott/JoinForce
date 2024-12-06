import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingProgramService {
  private apiUrl = 'http://localhost:5113/api/TrainingProgram'; // Base API URL

  constructor(private http: HttpClient) { }

  // Get all training programs
  getAllPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get a training program by ID
  getProgramById(programId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${programId}`);
  }

  // Get programs by VacancyId
  getProgramsByVacancyId(vacancyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vacancy/${vacancyId}`);
  }

  // Create a new training program
  createProgram(program: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}`, program, { headers });
  }

  // Update an existing training program
  updateProgram(programId: number, updatedProgram: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${programId}`, updatedProgram, { headers });
  }

  // Delete a training program
  deleteProgram(programId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${programId}`);
  }
}
