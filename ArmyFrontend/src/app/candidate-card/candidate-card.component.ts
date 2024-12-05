import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidateProfile, CandidateProfileService } from '../services/candidate-profile.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.css'
})
export class CandidateCardComponent {
  candidateProfile: CandidateProfile | null = null;
  errorMessage: string | null = null;
  userId: number = 0;
  @Input() actualUserId: number = 0;

  constructor(
    private candidateProfileService: CandidateProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    console.log(this.actualUserId);
    // Load profile using actualUserId
    this.candidateProfileService.getProfileByActualUserId(this.actualUserId).subscribe(
      (profile) => {
        // Set userId from the profile
        this.userId = profile.userId;
        this.loadCandidateProfile(); // Load candidate profile once the actualUserId is set
      },
      (error) => {
        console.error('Error loading profile by user ID:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
      }
    );
  }

  loadCandidateProfile(): void {
    if (!this.userId) {
      return;
    }

    this.candidateProfileService.getProfileById(this.userId).subscribe(
      (profile) => {
        this.candidateProfile = profile;
        console.log(this.candidateProfile);
      },
      (error) => {
        console.error('Error loading candidate profile:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
      }
    );
  }


}
