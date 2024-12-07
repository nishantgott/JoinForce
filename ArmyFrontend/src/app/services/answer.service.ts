import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of Answer
export interface Answer {
  answerId: number;
  questionId: number;
  answerContent: string;
  senderName: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl = `http://localhost:5113/api/Answer`; // Adjust with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all answers for a specific question
  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/question/${questionId}`);
  }

  // Create a new answer
  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl, answer);
  }

  // Get a specific answer by its ID
  getAnswerById(answerId: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/${answerId}`);
  }

  // Optional: Delete an answer by its ID
  deleteAnswer(answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${answerId}`);
  }
}
