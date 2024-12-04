import { Component, OnInit } from '@angular/core';
import { TestScheduleService } from '../../services/test-schedule.service';
import { EvaluationReportService, EvaluationReport } from '../../services/evaluation-report.service';
import { TestSchedule } from '../../services/test-schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-evaluation-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-evaluation-report.component.html',
  styleUrls: ['./create-evaluation-report.component.css']
})
export class CreateEvaluationReportComponent implements OnInit {
  testSchedules: TestSchedule[] = [];
  performanceMetrics: string = 'Pass';  // Default value is 'Pass'
  comments: string = '';
  score: number | null = null;
  selectedTestSchedule: TestSchedule | null = null;

  constructor(
    private testScheduleService: TestScheduleService,
    private evaluationReportService: EvaluationReportService
  ) { }

  ngOnInit() {
    // Fetch the test schedules from the service on initialization
    this.testScheduleService.getAllTestSchedules().subscribe(testSchedules => {
      testSchedules = testSchedules.filter(test => test.status === 'Pending');
      this.testSchedules = testSchedules;
      console.log(this.testSchedules);
    });
  }

  // Method to handle report creation
  createEvaluationReport(curr: TestSchedule) {
    if (curr?.status != 'Pending') {
      alert('Test already evaluated!');
      return;
    }
    if (this.performanceMetrics && this.comments && this.score !== null) {
      const newReport: EvaluationReport = {
        reportId: 0,  // Will be generated by the server
        userId: curr.userId,
        evaluationDate: new Date().toISOString(),
        performanceMetrics: this.performanceMetrics,
        comments: this.comments,
        score: this.score,
        testDate: curr.date,
        testType: curr.testType,
        applicationId: curr.applicationId
      };

      // Call the service to create the evaluation report
      this.evaluationReportService.createReport(newReport).subscribe((createdReport) => {
        console.log('Evaluation Report Created:', createdReport);
        alert('Evaluation Report Created Successfully!');

        // After successful report creation, update the test schedule status
        if (curr) {
          this.updateTestScheduleStatus(curr.testId, this.performanceMetrics, curr);
          this.testSchedules = this.testSchedules.filter(test => test.status === 'Pending');
        }

        // Reset the form after successful creation
        this.performanceMetrics = 'Pass';  // Reset to 'Pass' after submission
        this.comments = '';
        this.score = null;
        this.selectedTestSchedule = null;
      });
    } else {
      alert('Please fill all the fields.');
    }
  }



  // Method to update the test schedule status
  updateTestScheduleStatus(testId: number, status: string, curr: TestSchedule) {
    // Find the selected test schedule and update the status
    curr.status = status;

    // Call the service to update the test schedule in the database
    this.testScheduleService.updateTestSchedule(testId, curr).subscribe(() => {
      console.log('Test schedule status updated successfully');
      console.log(curr);
      // Optionally, handle success, such as updating the UI or state
    }, error => {
      console.error('Error updating test schedule:', error);
    });
  }
}
