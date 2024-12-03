import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:5113/api/exam';

  constructor(private http: HttpClient) { }

  // Get all exams
  getAllExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get exam by ID
  getExamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get exams by VacancyId
  getExamsByVacancyId(vacancyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vacancy/${vacancyId}`);
  }

  // Create a new exam
  createExam(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, exam);
  }

  // Update an existing exam
  updateExam(id: number, exam: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, exam);
  }

  // Delete an exam
  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
