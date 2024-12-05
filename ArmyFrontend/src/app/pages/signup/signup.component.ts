import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CandidateProfileService, CandidateProfile } from '../../services/candidate-profile.service';
import { UserNotification, UserNotificationsService } from '../../services/user-notifications.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  notification: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'INFO',
    readStatus: false
  };
  createAndSendNotification(): void {
    // Create the notification
    if (this.notification.message.trim() !== '') {
      // Call service to add the notification
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
    private userService: UserService,
    private candidateProfileService: CandidateProfileService,
    private userNotificationsService: UserNotificationsService,
    private router: Router
  ) {
    console.log('UserService and CandidateProfileService are injected successfully!');
  }

  passwordFieldType: string = 'password';

  user = {
    userId: 0, // Default to 0 if not provided
    username: '',
    passwordHash: '',
    role: 'Candidate', // Default to one role if applicable
    email: '',
    phoneNumber: '',
    isActive: true,
    lastLogin: "2024-12-01T21:10:01.335Z", // Optional, only if needed for the backend
  };

  candidateProfile: CandidateProfile = {
    "userId": 0,
    "fullName": "Enter your full name",
    "dob": "2024-12-03T21:05:30.253Z",
    "qualifications": "Enter your qualifications",
    "experience": "Enter your experience",
    "profilePicture": "Upload url of your profile picture",
    "militaryBackground": "Tell us about your military background",
    "about": "Tell us about yourself",
    "actualUserId": 0
  };

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Validate the form before submission
  isFormValid(): boolean {
    return !!this.user.email && !!this.user.username && !!this.user.passwordHash && !!this.user.role && !!this.user.phoneNumber;
  }

  // Submit the form to create both user and candidate profile
  submitForm(): void {
    console.log('submitForm called');
    if (!this.isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    // First, create the user
    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        alert('User added successfully!');

        // Send notification to user
        if (this.user.role === 'Candidate') {
          this.notification.userId = response.userId;
          this.notification.message = 'Welcome to JoinForce! Update your candidate profile to start applying for vacancies.';
          this.createAndSendNotification();
        }


        // After user creation, assign the created user's userId to candidateProfile
        this.candidateProfile.actualUserId = response.userId;

        // Now, create the candidate profile
        this.createCandidateProfile();
        // this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user.');
      },
      complete: () => {
        console.log('User creation request completed.');
      },
    });
  }

  // Create candidate profile after the user is created
  createCandidateProfile(): void {
    console.log('Candidate profile being created:', this.candidateProfile);

    this.candidateProfileService.createProfile(this.candidateProfile).subscribe({
      next: (profile) => {
        console.log('Candidate profile created successfully:', profile);
        alert('Candidate profile created successfully!');
      },
      error: (error) => {
        console.error('Error creating candidate profile:', error);
        alert('An error occurred while creating the candidate profile.');
      },
      complete: () => {
        console.log('Candidate profile creation request completed.');
      }
    });
  }
}
