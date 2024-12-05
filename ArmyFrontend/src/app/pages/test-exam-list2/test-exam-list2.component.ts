import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestSchedule, TestScheduleService } from '../../services/test-schedule.service';
import { ExamService } from '../../services/exam.service';
import { ExamResultService } from '../../services/exam-result.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-exam-list2',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './test-exam-list2.component.html',
  styleUrl: './test-exam-list2.component.css'
})
export class TestExamList2Component {
  exams: any[] = [];
  examResults: any[] = [];
  userId: number = 0;

  constructor(private examService: ExamService, private examResultService: ExamResultService) { }

  ngOnInit() {
    // Retrieve userId from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user.userId;
    }
    this.examResultService.getResultsByUserId(this.userId).subscribe(results => {
      this.examResults = results;
      this.examResults.forEach(result => {
        this.examService.getExamById(result.examId).subscribe(exam => {
          this.exams.push(exam);
          exam.status = result.resultStatus === 'Pending' ? 'Upcoming' : 'Completed';
          console.log(this.exams);
        });
      });
    });
  }
}