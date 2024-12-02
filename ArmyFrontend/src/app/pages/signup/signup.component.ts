import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { provideHttpClient, withFetch } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userService: UserService) {
    console.log('UserService is injected successfully!');
  }
  passwordFieldType: string = 'password';

  user = {
    userId: 0, // Default to 0 if not provide
    username: '', // PascalCase
    passwordHash: '',
    role: 'Candidate', // Default to one role if applicable
    email: '',
    phoneNumber: '',
    isActive: true, // Provide a default value if required
    lastLogin: "2024-12-01T21:10:01.335Z", // Optional, only if needed for the backend
  };


  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  isFormValid(): boolean {
    return !!this.user.email && !!this.user.username && !!this.user.passwordHash && !!this.user.role && !!this.user.phoneNumber;
  }

  submitForm(): void {
    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        alert('User added successfully!');
      },
      error: (error) => {
        console.log(this.user);
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user.');
      },
      complete: () => {
        console.log('Request completed.');
      },
    });

  }
}
