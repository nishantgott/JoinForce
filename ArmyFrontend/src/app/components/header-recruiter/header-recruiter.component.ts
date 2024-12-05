import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/login.service';


@Component({
  selector: 'app-header-recruiter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-recruiter.component.html',
  styleUrl: './header-recruiter.component.css'
})
export class HeaderRecruiterComponent {
  isDropdownVisible: boolean = false;
  user: any;
  constructor(private router: Router, private authService: AuthService) { }

  logout(): void {
    this.router.navigate(['/']).then(() => {
      this.authService.logout();
      this.user = null;
      window.location.reload();
    });
  }



  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  // This will be used to listen for clicks outside the dropdown
  @ViewChild('practiceDropdown') practiceDropdown!: ElementRef;

  // Toggle dropdown visibility
  toggleDropdown(event: MouseEvent): void {
    // Prevents event from bubbling up and triggering the outside click handler
    event.stopPropagation();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Close the dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.practiceDropdown && !this.practiceDropdown.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }
}
