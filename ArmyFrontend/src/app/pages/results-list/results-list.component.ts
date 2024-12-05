import { Component } from '@angular/core';
import { EvaluationReport, EvaluationReportService } from '../../services/evaluation-report.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css'
})
export class ResultsListComponent {
  evaluationReports: EvaluationReport[] = [];
  userId: number = 0;
  constructor(private evaluationReportService: EvaluationReportService) { };

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.userId;
      }
    }

    this.evaluationReportService.getAllReports().subscribe((reports) => {
      this.evaluationReports = reports;
      this.evaluationReports = this.evaluationReports.filter(report => report.userId == this.userId);
      console.log(this.evaluationReports);
    });
  }
}