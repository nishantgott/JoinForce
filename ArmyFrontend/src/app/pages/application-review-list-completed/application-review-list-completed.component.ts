import { Component } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from '../../components/profile-icon/profile-icon.component';

@Component({
  selector: 'app-application-review-list-completed',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, ProfileIconComponent],
  templateUrl: './application-review-list-completed.component.html',
  styleUrl: './application-review-list-completed.component.css'
})
export class ApplicationReviewListCompletedComponent {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {
    this.applicationService.getAllApplications().subscribe(data => {
      this.applications = data;
      this.applications = this.applications.filter(app => app.applicationStatus != 'Submitted');
      console.log(data);
    });
  }
}
