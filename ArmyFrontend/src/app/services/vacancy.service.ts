import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private apiUrl = 'http://localhost:5113/api/Vacancy';
  private examUrl = 'http://localhost:5113/api/Exam';

  constructor(private http: HttpClient) { }

  // Method to fetch all vacancies
  getAllVacancies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to fetch a single vacancy by ID
  getVacancyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Method to add a new vacancy
  addVacancy(vacancy: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, vacancy, { headers }).pipe(
      // After the vacancy is created, create the associated exam
      switchMap((vacancyResponse: any) => {
        const exam = this.createExam(vacancyResponse.vacancyId); // Use the newly created vacancy ID
        return this.http.post(this.examUrl, exam, { headers }); // Post the exam data
      })
    );
  }

  private createExam(vacancyId: number): any {
    const exam = {
      examId: 0,
      vacancyId: vacancyId,
      examDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),  // Set to 5 days from today
      totalMarks: 100,
      passingCriteria: 50,
    };
    return exam;
  }

  // Method to update an existing vacancy
  updateVacancy(id: number, vacancy: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, vacancy, { headers });
  }

  // Method to get exams by VacancyId
  getExamsByVacancyId(vacancyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.examUrl}/vacancy/${vacancyId}`);
  }

  // Method to delete a vacancy by ID
  deleteVacancy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Method to get vacancies by search
  searchVacancies(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}
