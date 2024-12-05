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
  isLoading: boolean = false;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
        this.isLoading = false;
      },
      (error) => {
        console.error('Search error', error);
        this.isLoading = false;
      }
    );
  }
}
