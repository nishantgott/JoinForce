import { Component, Input, OnInit } from '@angular/core';
import { CandidateProfile, CandidateProfileService } from '../../services/candidate-profile.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit {
  @Input() actualUserId!: number; // Input to receive the actualUserId
  profile?: CandidateProfile;

  constructor(private candidateProfileService: CandidateProfileService) { }

  ngOnInit(): void {
    if (this.actualUserId) {
      this.candidateProfileService.getProfileByActualUserId(this.actualUserId).subscribe(
        (profile) => {
          this.profile = profile;
        },
        (error) => {
          console.error('Error fetching profile:', error);
        }
      );
    }
  }
}
