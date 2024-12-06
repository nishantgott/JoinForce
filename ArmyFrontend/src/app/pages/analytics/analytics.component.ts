import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Application, ApplicationService } from '../../services/application.service';
import { ExamService } from '../../services/exam.service';
import { ExamResultService } from '../../services/exam-result.service';
import { RecruitmentReport, RecruitmentReportService } from '../../services/recruitment-report.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  vacancyId: number = 0;
  applications: Application[] = [];
  exam: any = null;
  examResults: any[] = [];
  user: any = null;
  generatedReports: RecruitmentReport[] = [];

  report: RecruitmentReport = {
    reportId: 0,
    vacancyId: 0,
    reportType: 'Vacancy Summary',
    data: '',
    dateGenerated: new Date(),
    generatedBy: 0,
    applicationCount: 0,
    reviewedCount: 0,
    selectedCount: 0,
    shortlistedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
    examTakenCount: 0,
    examPassCount: 0,
    examFailCount: 0,
    examAverageMarks: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private examService: ExamService,
    private examResultService: ExamResultService,
    private recruitmentReportService: RecruitmentReportService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Load user and vacancy ID from route parameters
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }

    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    if (!this.vacancyId) {
      console.error('Invalid vacancyId:', this.vacancyId);
      return;
    }

    this.report.vacancyId = this.vacancyId;
    this.report.generatedBy = this.user?.userId || 0;

    console.log('vacancyId:', this.vacancyId);
    this.fetchGeneratedReports();
  }

  fetchGeneratedReports(): void {
    this.recruitmentReportService.getReportsByVacancyId(this.vacancyId).subscribe(
      (reports) => {
        this.generatedReports = reports;
        console.log('Generated Reports:', this.generatedReports);
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.vacancyId) {
      console.error('Invalid vacancyId:', this.vacancyId);
      return;
    }

    this.applicationService.getAllApplications().subscribe(
      (apps) => {
        this.applications = apps.filter((app) => app.vacancyId === this.vacancyId);
        this.fillReport();

        console.log('Applications:', this.applications);

        this.examService.getExamsByVacancyId(this.vacancyId).subscribe(
          (exams) => {
            this.exam = exams[0];
            if (!this.exam) {
              console.warn('No exams found for vacancyId:', this.vacancyId);
              return;
            }

            console.log('Exam:', this.exam);

            this.examResultService.getResultsByExamId(this.exam.examId).subscribe(
              (results) => {
                this.examResults = results;
                console.log('Exam Results:', this.examResults);

                this.fillReport2();
                if (!this.validateReport()) {
                  console.error('Report validation failed. Aborting...');
                  return;
                }

                this.recruitmentReportService.createReport(this.report).subscribe(
                  (report) => {
                    console.log('Report created:', report);
                    this.generatedReports.push(report); // Add newly created report to the list
                  },
                  (error) => {
                    console.error('Error creating report:', error);
                  }
                );
              },
              (error) => {
                console.error('Error fetching exam results:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching exams:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching applications:', error);
      }
    );
  }

  fillReport(): void {
    this.report.applicationCount = this.applications.length;
    this.report.reviewedCount = this.applications.filter((app) => app.applicationStatus === 'Reviewed').length;
    this.report.selectedCount = this.applications.filter((app) => app.applicationStatus === 'Selected').length;
    this.report.shortlistedCount = this.applications.filter((app) => app.applicationStatus === 'Shortlisted').length;
    this.report.rejectedCount = this.applications.filter((app) => app.applicationStatus === 'Rejected').length;
    this.report.pendingCount = this.applications.filter((app) => app.applicationStatus === 'Submitted').length;
    console.log('Updated Report:', this.report);
  }

  fillReport2(): void {
    this.report.examTakenCount = this.examResults.length;
    this.report.examPassCount = this.examResults.filter((result) => result.resultStatus === 'Pass').length;
    this.report.examFailCount = this.examResults.filter((result) => result.resultStatus === 'Fail').length;

    if (this.examResults.length > 0) {
      this.report.examAverageMarks =
        this.examResults.reduce((acc, result) => acc + result.score, 0) / this.examResults.length;
    } else {
      this.report.examAverageMarks = 0;
    }

    console.log('Updated Report with Exam Data:', this.report);
  }

  validateReport(): boolean {
    if (!this.report.vacancyId || !this.report.generatedBy || !this.report.reportType) {
      console.error('Invalid report data:', this.report);
      return false;
    }
    return true;
  }
}
