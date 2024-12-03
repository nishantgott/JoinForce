import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  private apiUrl = 'http://localhost:5113/api/ExamResult';

  constructor(private http: HttpClient) { }

  // Method to get all exam results
  getAllExamResults(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to get exam result by ID
  getExamResultById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Method to get results by ExamId
  getResultsByExamId(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exam/${examId}`);
  }

  // Method to get results by UserId
  getResultsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Method to create a new exam result
  createExamResult(examResult: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, examResult, { headers });
  }

  // Method to update an existing exam result
  updateExamResult(id: number, examResult: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}`, examResult, { headers });
  }

  // Method to delete an exam result by ID
  deleteExamResult(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
