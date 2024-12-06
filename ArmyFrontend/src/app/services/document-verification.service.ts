import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentVerification {
  verificationId: number;
  applicationId: number;
  documentType: string;
  verificationStatus: string;
  remarks: string;

  // Document fields
  document1: string;
  document1Type: string;

  document2: string;
  document2Type: string;

  document3: string;
  document3Type: string;
}


@Injectable({
  providedIn: 'root',
})
export class DocumentVerificationService {

  private apiUrl = 'http://localhost:5113/api/DocumentVerification'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Get all verifications
  getAllVerifications(): Observable<DocumentVerification[]> {
    return this.http.get<DocumentVerification[]>(this.apiUrl);
  }

  // Get a verification by its ID
  getVerificationById(verificationId: number): Observable<DocumentVerification> {
    return this.http.get<DocumentVerification>(`${this.apiUrl}/${verificationId}`);
  }

  // Get verifications by Application ID
  getVerificationsByApplicationId(applicationId: number): Observable<DocumentVerification[]> {
    return this.http.get<DocumentVerification[]>(`${this.apiUrl}/application/${applicationId}`);
  }

  // Create a new document verification
  createVerification(verification: DocumentVerification): Observable<DocumentVerification> {
    return this.http.post<DocumentVerification>(this.apiUrl, verification);
  }

  // Update an existing verification
  updateVerification(verificationId: number, updatedVerification: DocumentVerification): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${verificationId}`, updatedVerification);
  }

  // Delete a verification by ID
  deleteVerification(verificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${verificationId}`);
  }
}
