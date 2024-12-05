import { Component } from '@angular/core';
import { TestSchedule, TestScheduleService } from '../../services/test-schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-exam-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './test-exam-list.component.html',
  styleUrls: ['./test-exam-list.component.css']
})
export class TestExamListComponent {
  testSchedules: TestSchedule[] = [];
  userId: number = 0;

  constructor(private testScheduleService: TestScheduleService) { }

  ngOnInit() {
    // Retrieve userId from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user.userId;
    }

    // Fetch the test schedules for the user
    this.testScheduleService.getTestSchedulesByUserId(this.userId).subscribe((testSchedules: TestSchedule[]) => {
      this.testSchedules = testSchedules;
    });
  }

  updateTestSchedule(testSchedule: TestSchedule) {
    if (testSchedule.status !== 'Pending') {
      alert('You have already given your test!');
      return;
    }
    // Ensure the date is in correct format before updating (e.g., 'yyyy-MM-dd')
    const updatedDate = testSchedule.date;
    if (updatedDate) {
      // Call the update service to save the new date
      this.testScheduleService.updateTestSchedule(testSchedule.testId, testSchedule).subscribe(
        () => {
          alert('Test schedule updated successfully!');
          console.log('Test schedule updated successfully!');
        },
        (error) => {
          console.error('Error updating test schedule', error);
        }
      );
    } else {
      console.error('Date is required for update');
    }
  }
}
