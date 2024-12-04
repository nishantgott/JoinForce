import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TestSchedule {
  testId: number;
  applicationId: number;
  testType: string;
  date: string;  // You can use Date type, but API returns string
  location: string;
  status: string;  //Pending, Pass, Fail
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestScheduleService {

  private apiUrl = `http://localhost:5113/api/testschedule`;  // Assuming your backend URL is set in environment.ts

  constructor(private http: HttpClient) { }

  // Get all test schedules
  getAllTestSchedules(): Observable<TestSchedule[]> {
    return this.http.get<TestSchedule[]>(this.apiUrl);
  }

  // Get test schedules by userId
  getTestSchedulesByUserId(userId: number): Observable<TestSchedule[]> {
    return this.http.get<TestSchedule[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get a test schedule by testId
  getTestScheduleById(testId: number): Observable<TestSchedule> {
    return this.http.get<TestSchedule>(`${this.apiUrl}/${testId}`);
  }

  // Get test schedules by applicationId
  getTestSchedulesByApplicationId(applicationId: number): Observable<TestSchedule[]> {
    return this.http.get<TestSchedule[]>(`${this.apiUrl}/application/${applicationId}`);
  }

  // Create a new test schedule
  createTestSchedule(testSchedule: TestSchedule): Observable<TestSchedule> {
    return this.http.post<TestSchedule>(this.apiUrl, testSchedule);
  }

  // Update an existing test schedule
  updateTestSchedule(testId: number, testSchedule: TestSchedule): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${testId}`, testSchedule);
  }

  // Delete a test schedule
  deleteTestSchedule(testId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${testId}`);
  }
}
