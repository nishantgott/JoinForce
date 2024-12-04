import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the EvaluationReport model
export interface EvaluationReport {
  reportId: number;
  userId: number;
  evaluationDate: string;
  performanceMetrics: string;
  comments: string;
  score: number;
  testDate: string;
  testType: string;
  applicationId: number;
}

@Injectable({
  providedIn: 'root',
})
export class EvaluationReportService {
  private apiUrl = `http://localhost:5113/api/evaluationreport`; // API base URL from environment

  constructor(private http: HttpClient) { }

  // Get all evaluation reports
  getAllReports(): Observable<EvaluationReport[]> {
    return this.http.get<EvaluationReport[]>(`${this.apiUrl}`);
  }

  // Get evaluation report by ID
  getReportById(reportId: number): Observable<EvaluationReport> {
    return this.http.get<EvaluationReport>(`${this.apiUrl}/${reportId}`);
  }

  // Get reports by UserId
  getReportsByUserId(userId: number): Observable<EvaluationReport[]> {
    return this.http.get<EvaluationReport[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new evaluation report
  createReport(report: EvaluationReport): Observable<EvaluationReport> {
    return this.http.post<EvaluationReport>(this.apiUrl, report);
  }

  // Update an existing evaluation report
  updateReport(reportId: number, updatedReport: EvaluationReport): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${reportId}`, updatedReport);
  }

  // Delete an evaluation report
  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reportId}`);
  }
}
