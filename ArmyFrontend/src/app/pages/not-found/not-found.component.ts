import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="flex items-center justify-center min-h-screen p-6 bg-[#F5F5E9]">
      <div class="max-w-6xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-[#D6BD98] text-center">
        <h1 class="text-4xl font-bold text-[#1A3636] mb-4">404 - Page Not Found</h1>
        <p class="text-lg text-[#40534C] mb-6">The page you're looking for doesn't exist.</p>
        <a [routerLink]="['/']"
           class="px-6 py-2 bg-[#1A3636] text-[#D6BD98] rounded-lg hover:bg-[#40534C] font-semibold">
          Go Back to Home
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent { }
