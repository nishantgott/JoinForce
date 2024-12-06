import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { VacancyService } from '../../services/vacancy.service';
import { ExamResultService } from '../../services/exam-result.service';
import { CommonModule, DatePipe } from '@angular/common';
import { UserNotification, UserNotificationsService } from '../../services/user-notifications.service';
import { CandidateCardComponent } from "../../candidate-card/candidate-card.component";
import { DocumentVerification, DocumentVerificationService } from '../../services/document-verification.service';

@Component({
  selector: 'app-application-review',
  standalone: true,
  imports: [DatePipe, CandidateCardComponent, RouterModule, CommonModule],
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.css']
})
export class ApplicationReviewComponent implements OnInit {
  application: any = {};  // Initialize as an empty object
  vacancy: any = {};      // Initialize as an empty object
  exam: any = null;       // Initialize to null
  applicationId: number = 0;
  userId: number = 0;
  isDataLoaded: boolean = false;
  documentVerification: DocumentVerification | null = null;
  notification: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'INFO',
    readStatus: false
  };
  createAndSendNotification(): void {
    // Create the notification
    if (this.notification.message.trim() !== '') {
      // Call service to add the notification
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

  constructor(
    private applicationService: ApplicationService,
    private vacancyService: VacancyService,
    private examResultService: ExamResultService,
    private route: ActivatedRoute,
    private userNotificationsService: UserNotificationsService,
    private router: Router,
    private documentVerificationService: DocumentVerificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = +params['id'];

      // Fetch application details by ID
      this.applicationService.getApplicationById(this.applicationId).subscribe((app) => {
        if (app) {
          this.application = app;
          this.notification.userId = this.application.userId;
          this.userId = this.application.userId;
          // this.userId = 40;

          // After fetching the application, fetch the related vacancy
          this.vacancyService.getVacancyById(app.vacancyId).subscribe((vacancy) => {
            if (vacancy) {
              this.vacancy = vacancy;
              console.log(this.vacancy);

              // Fetch the related exam based on the vacancy
              this.vacancyService.getExamsByVacancyId(vacancy.vacancyId).subscribe((exams) => {
                console.log('doo');
                console.log(exams);
                if (exams && exams.length > 0) {
                  this.exam = exams[0];  // Assuming there's only one exam per vacancy
                } else {
                  this.exam = null;  // Handle the case where no exams are found
                }
                this.documentVerificationService.getVerificationsByApplicationId(this.application.applicationId).subscribe(
                  (verifications) => {
                    if (verifications && verifications.length > 0) this.documentVerification = verifications[0];
                    console.log('Verifications:', this.documentVerification);
                    this.isDataLoaded = true;
                  },
                  (error) => {
                    console.error('Error fetching verifications:', error);
                  }
                );
              }, (error) => {
                console.error('Error fetching exams:', error);
                this.exam = null;  // Fallback to null if error occurs
              });
            } else {
              console.error('Vacancy not found');
            }
          }, (error) => {
            console.error('Error fetching vacancy:', error);
          });
        } else {
          console.error('Application not found');
        }
      }, (error) => {
        console.error('Error fetching application:', error);
      });
    });
  }

  rejectApplication(): void {
    if (this.application?.applicationStatus !== 'Submitted') {
      alert('Only applications with the status "Submitted" can be accepted.');
      this.router.navigate(['/application-review-list-completed']);
      return; // Stop further execution
    }
    if (this.application?.applicationId) {
      const updatedApplication = {
        ...this.application,
        applicationStatus: 'Rejected'
      };

      // Call service to update the application status to 'Rejected'
      this.applicationService.updateApplication(this.application.applicationId, updatedApplication).subscribe(
        () => {
          this.notification.message = `Your application(${this.application.applicationId}) has been rejected. Please apply for other vacancies.`;
          this.createAndSendNotification();
          alert('Application has been rejected successfully!');
          this.application.applicationStatus = 'Rejected';  // Update the UI
          this.router.navigate(['/application-review-list-completed']);
        },
        (error) => {
          console.error('Error rejecting application:', error);
          alert('There was an error while rejecting the application.');
        }
      );
    }
  }

  acceptApplication(): void {
    if (this.application?.applicationStatus !== 'Submitted') {
      alert('Only applications with the status "Submitted" can be accepted.');

      return; // Stop further execution
    }
    // console.log('checking accept');
    console.log('something2');
    console.log(this.application);
    console.log(this.exam);
    if (this.application?.applicationId && this.exam) {
      const updatedApplication = {
        ...this.application,
        applicationStatus: 'Reviewed'
      };

      // Call service to update the application status to 'Reviewed'
      this.applicationService.updateApplication(this.application.applicationId, updatedApplication).subscribe(
        () => {
          const examResult = {
            resultId: 0,
            examId: this.exam.examId,  // The Exam associated with the Vacancy
            userId: this.application.userId,  // UserId of the candidate
            score: 0,  // Default score
            resultStatus: 'Pending'  // Default result status
          };

          this.notification.message = `Your application(${this.application.applicationId}) has been reviewed. You have an exam scheduled on ${this.exam.examDate}`;
          this.createAndSendNotification();

          // Create ExamResult for the user
          this.examResultService.createExamResult(examResult).subscribe(
            (result) => {
              console.log('something');
              alert('Application has been reviewed and exam result created!');
              this.application.applicationStatus = 'Reviewed';  // Update the UI
              this.router.navigate(['/application-review-list-completed']);

            },
            (error) => {
              console.error('Error creating exam result:', error);
              alert('There was an error while creating the exam result.');
            }
          );
        },
        (error) => {
          console.error('Error accepting application:', error);
          alert('There was an error while accepting the application.');
        }
      );
    }
  }
}
