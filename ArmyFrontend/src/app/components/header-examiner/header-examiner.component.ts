import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-examiner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-examiner.component.html',
  styleUrl: './header-examiner.component.css'
})
export class HeaderExaminerComponent {
  isDropdownVisible: boolean = false;
  user: any;

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