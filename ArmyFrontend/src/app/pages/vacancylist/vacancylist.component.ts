import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancylist.component.html',
  styleUrls: ['./vacancylist.component.css']
})
export class VacancylistComponent implements OnInit {
  vacancies: any[] = []; // Array to hold the vacancies
  isLoading: boolean = true; // To show a loading indicator while fetching vacancies
  error: string | null = null; // For error handling

  constructor(private vacancyService: VacancyService) { }

  ngOnInit(): void {
    this.fetchVacancies();
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
