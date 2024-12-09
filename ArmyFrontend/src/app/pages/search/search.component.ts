import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  vacancies: any[] = [];
  filteredVacancies: any[] = [];
  isLoading: boolean = false;

  // Filters
  selectedRole: string = '';
  selectedExperience: number | null = null;
  selectedSalary: number | null = null;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query');
      if (query) {
        this.searchTerm = query;
        this.searchVacancies();
      }
    });
  }

  searchVacancies(): void {
    if (this.searchTerm.trim() === '') {
      return;
    }

    this.isLoading = true;

    this.vacancyService.searchVacancies(this.searchTerm).subscribe(
      (data) => {
        this.vacancies = data;
        this.filteredVacancies = data; // Initialize with all vacancies
        this.isLoading = false;
      },
      (error) => {
        console.error('Search error', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredVacancies = this.vacancies.filter((vacancy) => {
      const matchesRole = this.selectedRole ? vacancy.role === this.selectedRole : true;
      const matchesExperience = this.selectedExperience
        ? vacancy.experienceMin >= this.selectedExperience
        : true;
      const matchesSalary = this.selectedSalary ? vacancy.salary >= this.selectedSalary : true;
      return matchesRole && matchesExperience && matchesSalary;
    });
  }
}
