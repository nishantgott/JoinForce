import { Component } from '@angular/core';
import { ExamResultService } from '../../services/exam-result.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-exam-results-change',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-results-change.component.html',
  styleUrls: ['./exam-results-change.component.css']
})
export class ExamResultsChangeComponent {
  examResults: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private examResultService: ExamResultService,
    private examService: ExamService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.fetchExamResults();
  }

  fetchExamResults(): void {
    this.examResultService.getAllExamResults().subscribe(
      (results) => {
        this.examResults = results;
        this.examResults = this.examResults.filter(result => result.resultStatus != 'Pending');
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching exam results:', err);
        this.error = 'Failed to load exam results. Please try again later.';
        this.loading = false;
      }
    );
  }

  updateExamResult(examResult: any, marks: number): void {
    if (examResult.resultStatus !== 'Pending') {
      alert('Only pending exam results can be updated.');
      return;
    }

    examResult.score = marks;
    let status: string;

    if (marks > 50) {
      examResult.resultStatus = 'Pass';
      status = 'Shortlisted';  // Update application status to Shortlisted if pass
    } else {
      examResult.resultStatus = 'Fail';
      status = 'Rejected';  // Update application status to Rejected if fail
    }

    // Update the exam result
    this.examResultService.updateExamResult(examResult.resultId, examResult).subscribe(
      (result) => {
        console.log('Exam Result Updated Successfully:', result);
        alert('Exam Result Updated Successfully!');

        // After updating the exam result, update the application status
        this.updateApplicationStatus(examResult, status);
      },
      (error) => {
        console.error('Error updating exam result:', error);
        alert('There was an error while updating the exam result.');
      }
    );
  }

  updateApplicationStatus(examResult: any, status: string): void {
    const userId = examResult.userId;  // Get the userId from the exam result
    const examId = examResult.examId;  // Get the examId from the exam result

    // Step 1: Fetch the exam using the examId
    this.examService.getExamById(examId).subscribe(
      (exam) => {
        const vacancyId = exam.vacancyId;  // Get the vacancyId from the fetched exam
        console.log(`Vacancy ID associated with the exam: ${vacancyId}`);

        // Step 2: Fetch all applications for the user
        this.applicationService.getApplicationsByUserId(userId).subscribe(
          (applications) => {
            // Step 3: Filter the applications to find the one matching the vacancyId
            const application = applications.find(app => app.vacancyId === vacancyId);

            if (application) {
              const applicationId = application.applicationId;  // Get the applicationId
              console.log(`Application ID associated with the exam result: ${applicationId}`);

              // Step 4: Update the application status with the new status (Shortlisted/Rejected)
              application.applicationStatus = status;  // Set the new status
              this.applicationService.updateApplication(applicationId, application).subscribe(
                () => {
                  console.log('Application status updated successfully!');
                  alert('Application status updated successfully!');
                },
                (error) => {
                  console.error('Error updating application status:', error);
                  alert('Failed to update application status.');
                }
              );
            } else {
              console.error('No application found with the matching vacancyId');
              alert('No matching application found for this exam.');
            }
          },
          (error) => {
            console.error('Error fetching applications:', error);
            alert('Failed to fetch applications for the user.');
          }
        );
      },
      (error) => {
        console.error('Error fetching exam:', error);
        alert('Failed to fetch the exam details.');
      }
    );
  }
}
