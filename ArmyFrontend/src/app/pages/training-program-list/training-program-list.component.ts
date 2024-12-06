import { Component } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';
import { TrainingProgramService } from '../../services/training-program.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-training-program-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './training-program-list.component.html',
  styleUrl: './training-program-list.component.css'
})
export class TrainingProgramListComponent {
  user: any;
  applications: Application[] = [];
  trainingPrograms: any[] = [];

  constructor(private applicationService: ApplicationService, private trainingProgramService: TrainingProgramService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.applicationService.getApplicationsByUserId(this.user.userId).subscribe(
      (apps) => {
        this.applications = apps;
        this.applications = this.applications.filter(app => app.applicationStatus === 'Selected');
        console.log(this.applications);
        this.applications.forEach(app => {
          this.trainingProgramService.getProgramsByVacancyId(app.vacancyId).subscribe(
            (programs) => {
              // console.log(programs);
              this.trainingPrograms.push(...programs);
              // console.log(this.trainingPrograms);
            },
            (error) => {
              console.error('Error fetching programs:', error);
            }
          );
        });

      },
      (error) => {
        console.error('Error fetching applications:', error);
      }
    );
  }
}
