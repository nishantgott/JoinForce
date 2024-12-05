import { Component } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-application-review-list',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './application-review-list.component.html',
  styleUrl: './application-review-list.component.css'
})
export class ApplicationReviewListComponent {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {
    this.applicationService.getAllApplications().subscribe(data => {
      this.applications = data;
      this.applications = this.applications.filter(app => app.applicationStatus === 'Submitted');
      console.log(data);
    });
  }
}
