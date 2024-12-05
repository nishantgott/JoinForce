import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExamResultService } from '../../services/exam-result.service';
import { ExamService } from '../../services/exam.service';
import { ApplicationService } from '../../services/application.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-results-list-exam',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results-list-exam.component.html',
  styleUrls: ['./results-list-exam.component.css']
})
export class ResultsListExamComponent implements OnInit {
  examResults: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  userId: number = 0;

  constructor(
    private examResultService: ExamResultService,
    private examService: ExamService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.userId;
      }
    }

    this.fetchExamResults();
  }

  fetchExamResults(): void {
    this.examResultService.getAllExamResults().subscribe(
      (results) => {
        // Filter exam results for the current user
        this.examResults = results.filter(result => result.userId === this.userId);

        // Create an array of exam fetch observables
        const examRequests = this.examResults.map(result =>
          this.examService.getExamById(result.examId).pipe(
            // Merge the exam data with the corresponding examResult
            map(exam => {
              result.vacancyId = exam.vacancyId; // Add the vacancyId to the examResult
            })
          )
        );

        // Wait for all the exam requests to complete
        forkJoin(examRequests).subscribe(() => {
          // After all requests complete, we can set loading to false
          this.loading = false;
        });
      },
      (err) => {
        console.error('Error fetching exam results:', err);
        this.error = 'Failed to load exam results. Please try again later.';
        this.loading = false;
      }
    );
  }
}
