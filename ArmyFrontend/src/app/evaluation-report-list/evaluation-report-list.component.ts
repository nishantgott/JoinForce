import { Component } from '@angular/core';
import { EvaluationReport, EvaluationReportService } from '../services/evaluation-report.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-evaluation-report-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './evaluation-report-list.component.html',
  styleUrl: './evaluation-report-list.component.css'
})
export class EvaluationReportListComponent {
  evaluationReports: EvaluationReport[] = [];
  constructor(private reportService: EvaluationReportService) { }

  ngOnInit() {
    this.reportService.getAllReports().subscribe((reports) => {
      this.evaluationReports = reports;
      console.log(this.evaluationReports);
    });
  }
}
