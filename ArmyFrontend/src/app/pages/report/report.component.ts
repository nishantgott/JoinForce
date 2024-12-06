import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecruitmentReport, RecruitmentReportService } from '../../services/recruitment-report.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';



@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: RecruitmentReport | null = null; // To hold the fetched report
  applicationChartData: ChartConfiguration<'pie'>['data'] | null = null;
  examBarChartData: ChartConfiguration<'bar'>['data'] | null = null;
  examDoughnutChartData: ChartConfiguration<'doughnut'>['data'] | null = null;


  constructor(
    private route: ActivatedRoute,
    private recruitmentReportService: RecruitmentReportService
  ) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Fetch the report using the service
    if (id) {
      this.recruitmentReportService.getReportById(id).subscribe(
        (fetchedReport) => {
          this.report = fetchedReport;
          console.log('Fetched Report:', this.report);
          this.prepareCharts();
        },
        (error) => {
          console.error('Error fetching report:', error);
        }
      );
    } else {
      console.warn('No report ID found in the URL');
    }
  }

  prepareCharts(): void {
    if (!this.report) return;

    // Applications Pie Chart Data
    this.applicationChartData = {
      labels: ['Reviewed', 'Shortlisted', 'Rejected', 'Pending', 'Selected'],
      datasets: [
        {
          data: [
            this.report.reviewedCount,
            this.report.shortlistedCount,
            this.report.rejectedCount,
            this.report.pendingCount,
            this.report.selectedCount,
          ],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E', '#3F51B5'],
        },
      ],
    };

    // Exam Bar Chart Data
    this.examBarChartData = {
      labels: ['Exams Taken', 'Pass Count', 'Fail Count'],
      datasets: [
        {
          label: 'Exam Statistics',
          data: [
            this.report.examTakenCount,
            this.report.examPassCount,
            this.report.examFailCount,
          ],
          backgroundColor: ['#4CAF50', '#3F51B5', '#F44336'],
        },
      ],
    };

    // Exam Doughnut Chart Data
    this.examDoughnutChartData = {
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          data: [this.report.examPassCount, this.report.examFailCount],
          backgroundColor: ['#4CAF50', '#F44336'],
        },
      ],
    };
  }
}
