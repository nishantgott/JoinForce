import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
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
        this.authService.storeToken(response.token, this.loginData.username);
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
}
