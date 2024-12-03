import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateProfile {
  userId: number;
  fullName: string;
  dob: string;
  qualifications: string;
  experience: string;
  profilePicture: string;
  militaryBackground: string;
  about: string;
  actualUserId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CandidateProfileService {
  private apiUrl = 'http://localhost:5113/api/candidateprofile';  // Adjust your API URL if needed

  constructor(private http: HttpClient) { }

  // Get all candidate profiles
  getAllProfiles(): Observable<CandidateProfile[]> {
    return this.http.get<CandidateProfile[]>(this.apiUrl);
  }

  // Get a candidate profile by UserId
  getProfileById(userId: number): Observable<CandidateProfile> {
    return this.http.get<CandidateProfile>(`${this.apiUrl}/${userId}`);
  }

  // Get a candidate profile by ActualUserId
  getProfileByActualUserId(actualUserId: number): Observable<CandidateProfile> {
    return this.http.get<CandidateProfile>(`${this.apiUrl}/by-actualuserid/${actualUserId}`);
  }

  // Create a new candidate profile
  createProfile(profile: CandidateProfile): Observable<CandidateProfile> {
    return this.http.post<CandidateProfile>(this.apiUrl, profile, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Update an existing candidate profile
  updateProfile(userId: number, profile: CandidateProfile): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${userId}`, profile, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Delete a candidate profile by UserId
  deleteProfile(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
