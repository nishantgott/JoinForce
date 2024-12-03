import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateProfileService, CandidateProfile } from '../../services/candidate-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit {
  candidateProfile: CandidateProfile | null = null;
  isEditing: boolean = false;
  errorMessage: string | null = null;
  userId: number = 0;

  constructor(
    private candidateProfileService: CandidateProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const actualUserId = Number(this.route.snapshot.paramMap.get('id')); // Here we are taking the userId whose candidate profile we want to display

    // Load profile using actualUserId
    this.candidateProfileService.getProfileByActualUserId(actualUserId).subscribe(
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
      },
      (error) => {
        console.error('Error loading candidate profile:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
      }
    );
  }

  // Enable edit mode
  editProfile(): void {
    if (this.candidateProfile) {
      this.isEditing = true;
    }
  }

  // Cancel edit mode and reload the profile
  cancelEdit(): void {
    this.isEditing = false;
    this.loadProfile(); // Reload the profile to reset any changes
  }

  // Save profile after editing
  saveProfile(): void {
    if (this.candidateProfile) {
      this.candidateProfileService.updateProfile(this.candidateProfile.userId, this.candidateProfile).subscribe(
        () => {
          this.isEditing = false;
          alert('Profile updated successfully!');
        },
        (error) => {
          console.error('Error updating profile', error);
          alert('Failed to update profile');
        }
      );
    }
  }
}
