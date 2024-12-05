import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-logged-out',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header-logged-out.component.html',
  styleUrl: './header-logged-out.component.css'
})
export class HeaderLoggedOutComponent {
  searchTerm: string = '';
  onSearch(): void {
    this.router.navigate(['/search', this.searchTerm]);
  }

  constructor(private router: Router) {

  }
}
