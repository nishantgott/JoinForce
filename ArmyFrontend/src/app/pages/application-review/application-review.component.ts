import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { VacancyService } from '../../services/vacancy.service';
import { ExamResultService } from '../../services/exam-result.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-review',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.css']
})
export class ApplicationReviewComponent implements OnInit {
  application: any = {};  // Initialize as an empty object
  vacancy: any = {};      // Initialize as an empty object
  exam: any = null;       // Initialize to null
  applicationId: number = 0;

  constructor(
    private applicationService: ApplicationService,
    private vacancyService: VacancyService,
    private examResultService: ExamResultService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = +params['id'];

      // Fetch application details by ID
      this.applicationService.getApplicationById(this.applicationId).subscribe((app) => {
        if (app) {
          this.application = app;

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
          alert('Application has been rejected successfully!');
          this.application.applicationStatus = 'Rejected';  // Update the UI
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

          // Create ExamResult for the user
          this.examResultService.createExamResult(examResult).subscribe(
            (result) => {
              console.log('something');
              alert('Application has been reviewed and exam result created!');
              this.application.applicationStatus = 'Reviewed';  // Update the UI
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
