import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vacancylist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacancylist.component.html',
  styleUrls: ['./vacancylist.component.css']
})
export class VacancylistComponent implements OnInit {
  vacancies: any[] = []; // Array to hold the vacancies
  isLoading: boolean = true; // To show a loading indicator while fetching vacancies
  error: string | null = null; // For error handling
  user: any;

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

  // Fetch all vacancies from the VacancyService
  fetchVacancies(): void {
    this.vacancyService.getAllVacancies().subscribe(
      (data: any[]) => {
        this.vacancies = data; // Store the vacancies in the array
        console.log(this.vacancies);
        this.isLoading = false; // Set loading to false once data is fetched
      },
      (error) => {
        this.error = 'Failed to load vacancies'; // Handle errors
        this.isLoading = false;
      }
    );
  }
}
