import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { PlatformAccessService } from '../../services/platform-access.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  user: any = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private platformAccessService: PlatformAccessService
  ) { }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.storeToken(response.token, this.loginData.username);

        // Save platform details
        console.log('this response', response);
        const platformAccess = {
          platformId: 0,
          userId: 0,
          deviceType: this.getDeviceType(),
          lastAccessDate: new Date(),
          preferredLanguage: navigator.language,
          username: this.loginData.username,
        };

        this.platformAccessService.createPlatformAccess(platformAccess).subscribe({
          next: () => {
            console.log('Platform details saved successfully.');
          },
          error: (err) => {
            console.error('Failed to save platform details:', err);
          },
        });

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log(this.loginData);
        console.error('Login failed:', error);
        alert('Wrong username or password.');
        window.location.reload();
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }

  private getDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      return 'Mobile';
    } else {
      return 'Desktop';
    }
  }
}
