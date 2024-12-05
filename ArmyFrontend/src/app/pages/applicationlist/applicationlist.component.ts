import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Application, ApplicationService } from '../../services/application.service';
import { VacancyService } from '../../services/vacancy.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-applicationlist',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.css']
})
export class ApplicationlistComponent implements OnInit {
  vacancies: any[] = []; // Declare vacancies as an array of Vacancy type
  vacancies2: any[] = []; // Declare vacancies as an array of Vacancy type
  applications: Application[] = []; // Declare applications as an array of Application type
  user: any;

  constructor(
    private applicationService: ApplicationService,
    private vacancyService: VacancyService
  ) { }

  ngOnInit(): void {
    // Check if window and localStorage are available
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
        console.log(user);
      }
    }
    this.loadData();
  }

  loadData(): void {
    if (this.user && this.user.userId) {
      // Fetch user's applications by userId
      this.applicationService.getApplicationsByUserId(this.user.userId).subscribe((apps: Application[]) => {
        this.applications = apps;
        console.log(this.applications);
        // Fetch all vacancies after applications data is loaded
        this.vacancyService.getAllVacancies().subscribe((vacancies: any[]) => {
          this.vacancies = vacancies;
          console.log(this.vacancies);
          // Map the applications to the corresponding vacancies
          this.mapApplicationsToVacancies();
          this.vacancies2 = this.vacancies.filter((v) => v.applicationStatus != 'Not Applied');
        });
      });
    }
  }

  // Map application status to each vacancy
  mapApplicationsToVacancies(): void {
    this.vacancies.forEach((vacancy: any) => {
      const application = this.applications.find(app => app.vacancyId === vacancy.vacancyId);
      vacancy.applicationStatus = application ? application.applicationStatus : 'Not Applied';
    });
  }
}
