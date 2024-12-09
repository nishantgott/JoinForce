import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacancylist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vacancylist.component.html',
  styleUrls: ['./vacancylist.component.css']
})
export class VacancylistComponent implements OnInit {
  vacancies: any[] = [];
  filteredVacancies: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  user: any;

  // Filters
  selectedRole: string = '';
  selectedExperience: number | null = null;
  selectedSalary: number | null = null; // New salary filter

  constructor(private vacancyService: VacancyService) { }

  ngOnInit(): void {
    this.fetchVacancies();
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  fetchVacancies(): void {
    this.vacancyService.getAllVacancies().subscribe(
      (data: any[]) => {
        this.vacancies = data;
        this.filteredVacancies = data; // Initialize with all vacancies
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load vacancies';
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredVacancies = this.vacancies.filter(vacancy => {
      const matchesRole = this.selectedRole ? vacancy.role === this.selectedRole : true;
      const matchesExperience = this.selectedExperience
        ? vacancy.experienceMin >= this.selectedExperience
        : true;
      const matchesSalary = this.selectedSalary
        ? vacancy.salary >= this.selectedSalary
        : true; // Check if salary meets criteria
      return matchesRole && matchesExperience && matchesSalary;
    });
  }
}
