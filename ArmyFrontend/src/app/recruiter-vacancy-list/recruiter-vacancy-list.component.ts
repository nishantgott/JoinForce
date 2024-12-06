import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { VacancyService } from '../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruiter-vacancy-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruiter-vacancy-list.component.html',
  styleUrl: './recruiter-vacancy-list.component.css'
})
export class RecruiterVacancyListComponent {
  user: any;
  constructor(private userService: UserService, private vacancyService: VacancyService) { }
  vacancies: any[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    this.fetchVacancies();
  }

  fetchVacancies(): void {
    this.vacancyService.getAllVacancies().subscribe(
      (data: any[]) => {
        this.vacancies = data;
        this.vacancies = this.vacancies.filter(v => v.postedBy === this.user?.userId);
        console.log(this.vacancies);
      },
      (error) => {
        console.error('Error fetching vacancies:', error);
      }
    );
  }
}
