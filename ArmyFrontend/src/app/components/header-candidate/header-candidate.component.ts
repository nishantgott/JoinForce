import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { UserNotificationsService } from '../../services/user-notifications.service';

@Component({
  selector: 'app-header-candidate',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header-candidate.component.html',
  styleUrls: ['./header-candidate.component.css']
})
export class HeaderCandidateComponent {
  isDropdownVisible: boolean = false;
  isHeaderCollapsed: boolean = false;
  user: any;
  unread: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userNotificationsService: UserNotificationsService
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    this.userNotificationsService.getUserNotifications(this.user?.userId).subscribe(
      (userNotifications) => {
        this.unread = userNotifications.notifications.filter((n) => !n.readStatus).length;
      },
      (error) => {
        console.error('Error fetching user notifications:', error);
      }
    );
  }

  searchTerm: string = '';
  onSearch(): void {
    this.router.navigate(['/search', this.searchTerm]);
  }

  logout(): void {
    this.router.navigate(['/']).then(() => {
      this.authService.logout();
      this.user = null;
      window.location.reload();
    });
  }

  @ViewChild('practiceDropdown') practiceDropdown!: ElementRef;

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.practiceDropdown && !this.practiceDropdown.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  toggleHeader(): void {
    this.isHeaderCollapsed = !this.isHeaderCollapsed;
  }
}
