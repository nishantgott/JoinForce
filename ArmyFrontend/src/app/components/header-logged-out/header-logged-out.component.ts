import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-logged-out',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header-logged-out.component.html',
  styleUrls: ['./header-logged-out.component.css']
})
export class HeaderLoggedOutComponent {
  searchTerm: string = '';
  isHeaderCollapsed: boolean = false;

  constructor(private router: Router) { }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search', this.searchTerm.trim()]);
    }
  }

  toggleHeader(): void {
    this.isHeaderCollapsed = !this.isHeaderCollapsed;
  }
}
