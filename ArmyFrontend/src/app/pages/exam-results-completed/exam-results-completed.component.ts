import { Component } from '@angular/core';
import { ExamResultService } from '../../services/exam-result.service';
import { ExamService } from '../../services/exam.service';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-results-completed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exam-results-completed.component.html',
  styleUrl: './exam-results-completed.component.css'
})
export class ExamResultsCompletedComponent {
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

}
