import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/" class="back-link">Go Back to Home</a>
    </div>
  `,
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent { }
