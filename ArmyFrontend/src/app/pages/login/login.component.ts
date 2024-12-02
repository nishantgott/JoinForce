import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.storeToken(response.token);
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(this.loginData);
        console.error('Login failed:', error);
        alert('Wrong username or password.');
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
