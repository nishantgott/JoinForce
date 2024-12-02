import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.css'
})
export class CreateVacancyComponent implements OnInit {
  vacancy: any = {
    title: '',
    role: '',
    eligibilityCriteria: '',
    location: '',
    salary: 0,
    jobDetails: '',
    experienceMin: 0,
    experienceMax: 0,
    deadline: ''
  };

  constructor(private vacancyService: VacancyService) { }

  ngOnInit(): void {
    // Initialization logic if any
  }

  onSubmit(): void {
    // Prepare the vacancy object with additional fields (like posting date)
    this.vacancy.datePosted = new Date().toISOString();  // Current date
    this.vacancy.status = 'Open';  // Default status
    this.vacancy.appliedCount = 0;  // Initially 0 applied

    // Convert deadline to ISO string if not already
    this.vacancy.deadline = new Date(this.vacancy.deadline).toISOString();

    // Call the service to add the vacancy
    this.vacancyService.addVacancy(this.vacancy).subscribe(
      (response) => {
        console.log('Vacancy created successfully', response);
      },
      (error) => {
        console.error('Error creating vacancy', error);
      }
    );
  }
}



