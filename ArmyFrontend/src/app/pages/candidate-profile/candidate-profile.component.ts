import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateProfileService, CandidateProfile } from '../../services/candidate-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserNotification, UserNotificationsService } from '../../services/user-notifications.service';

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
  inputText: string | null = null;
  notification: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'MESSAGE',
    readStatus: false
  };
  createAndSendNotification(): void {
    if (this.notification.message.trim() !== '') {
      this.userNotificationsService.addUserNotifications(this.notification.userId, this.notification).subscribe(
        (response) => {
          console.log('Notification Created:', response);
        },
        (error) => {
          console.error('Error creating notification:', error);
        }
      );
    } else {
      console.log('Please enter a notification message');
    }
  }

  constructor(
    private candidateProfileService: CandidateProfileService,
    private route: ActivatedRoute,
    private userNotificationsService: UserNotificationsService
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
        this.notification.userId = Number(this.route.snapshot.paramMap.get('id'))
        console.log('notification to user ', this.notification.userId);
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

  sendMessage(): void {
    if (this.inputText) this.notification.message = this.inputText;
    console.log(this.notification);
    alert('Message sent successfully!');
    this.inputText = '';
    this.createAndSendNotification();
  }
}
