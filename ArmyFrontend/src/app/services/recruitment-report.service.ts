import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecruitmentReport {
  reportId: number;
  vacancyId: number;
  reportType: string; // e.g., VacancySummary, CandidateStatistics
  data: string; // JSON or stringified data
  dateGenerated: Date;
  generatedBy: number; // Admin UserId
  applicationCount: number;
  reviewedCount: number;
  selectedCount: number;
  shortlistedCount: number;
  rejectedCount: number;
  pendingCount: number;
  examTakenCount: number;
  examPassCount: number;
  examFailCount: number;
  examAverageMarks: number;
}


@Injectable({
  providedIn: 'root',
})


export class RecruitmentReportService {
  private apiUrl = 'http://localhost:5113/api/RecruitmentReport';

  constructor(private http: HttpClient) { }

  // Get all recruitment reports
  getAllReports(): Observable<RecruitmentReport[]> {
    return this.http.get<RecruitmentReport[]>(this.apiUrl);
  }

  // Get a recruitment report by ID
  getReportById(reportId: number): Observable<RecruitmentReport> {
    return this.http.get<RecruitmentReport>(`${this.apiUrl}/${reportId}`);
  }

  // Get recruitment reports by Vacancy ID
  getReportsByVacancyId(vacancyId: number): Observable<RecruitmentReport[]> {
    return this.http.get<RecruitmentReport[]>(`${this.apiUrl}/vacancy/${vacancyId}`);
  }

  // Create a new recruitment report
  createReport(report: RecruitmentReport): Observable<RecruitmentReport> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RecruitmentReport>(this.apiUrl, report, { headers });
  }

  // Update an existing recruitment report
  updateReport(reportId: number, report: RecruitmentReport): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.apiUrl}/${reportId}`, report, { headers });
  }

  // Delete a recruitment report
  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reportId}`);
  }
}
