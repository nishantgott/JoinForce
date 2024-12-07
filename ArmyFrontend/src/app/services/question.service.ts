import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of Question
export interface Question {
  questionId: number;
  vacancyId: number;
  questionContent: string;
  senderName: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = `http://localhost:5113/api/Question`;

  constructor(private http: HttpClient) { }

  // Get all questions
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  // Get questions by vacancyId
  getQuestionsByVacancyId(vacancyId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/vacancy/${vacancyId}`);
  }

  // Create a new question
  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question);
  }

  // Get a specific question by its ID
  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${questionId}`);
  }

  // Optional: Delete a question by its ID
  deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${questionId}`);
  }
}
