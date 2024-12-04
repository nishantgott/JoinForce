import { Component } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { EvaluationReport, EvaluationReportService } from '../../services/evaluation-report.service';

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
