import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { UserNotification, UserNotificationsService } from '../../services/user-notifications.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
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
    deadline: '',
    postedBy: 1
  };
  userId: number = 0;
  notification: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'INFO',
    readStatus: false
  };
  createAndSendNotification(): void {
    if (this.notification.message.trim() !== '') {
      this.userNotificationsService.addUserNotifications(this.notification.userId, this.notification).subscribe(
        (response) => {
          console.log('Notification Created:', response);
        },
        (error) => {
          console.error('Error creating notification:', error);
        }
      );
    } else {
      console.log('Please enter a notification message');
    }
  }



  constructor(private vacancyService: VacancyService, private userNotificationsService: UserNotificationsService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.userId;
        this.notification.userId = this.userId;
      }
    }
  }

  onSubmit(): void {
    // Prepare the vacancy object with additional fields (like posting date)
    this.vacancy.datePosted = new Date().toISOString();  // Current date
    this.vacancy.status = 'Open';  // Default status
    this.vacancy.appliedCount = 0;  // Initially 0 applied
    this.vacancy.postedBy = this.userId;

    // Convert deadline to ISO string if not already
    this.vacancy.deadline = new Date(this.vacancy.deadline).toISOString();

    // Call the service to add the vacancy
    this.vacancyService.addVacancy(this.vacancy).subscribe(
      (response) => {
        console.log('Vacancy created successfully', response);
        this.notification.message = `Your vacancy(ID: ${response.vacancyId}) has been created.`;
        this.createAndSendNotification();
        this.router.navigate(['/vacancy', response.vacancyId]);
      },
      (error) => {
        console.error('Error creating vacancy', error);
      }
    );
  }
}



