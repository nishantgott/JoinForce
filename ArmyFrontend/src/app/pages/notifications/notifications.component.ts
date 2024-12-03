import { Component, OnInit } from '@angular/core';
import { UserNotification, UserNotificationsService } from '../../services/user-notifications.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: UserNotification[] = [];
  userId: number = 0;

  constructor(private userNotificationsService: UserNotificationsService) { }

  ngOnInit(): void {
    this.loadUserNotifications();
  }

  loadUserNotifications(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Check if we are in a browser environment
      const storedUser = localStorage.getItem('user');
      // console.log('this is');
      // console.log(storedUser);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // console.log(user.userId);
        this.userId = user.userId;
      }
    }

    if (this.userId) {
      // Fetch notifications if userId is set
      this.userNotificationsService.getUserNotifications(this.userId).subscribe(
        (userNotifications) => {
          this.notifications = userNotifications.notifications;
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );
    } else {
      console.warn('User ID is not available.');
    }
  }



  markAsRead(notificationId: number): void {
    // Optimistic UI Update: Immediately set the read status to true
    const notification = this.notifications.find(n => n.notificationId === notificationId);

    if (notification) {
      notification.readStatus = true;
    }

    // Call the backend to update the read status
    this.userNotificationsService.markNotificationAsRead(notificationId).subscribe(
      () => {
        console.log('Notification marked as read successfully.');
      },
      (error) => {
        // If the backend fails, revert the optimistic update
        console.error('Error marking notification as read:', error);
        if (notification) {
          notification.readStatus = false; // Revert the change
        }
      }
    );
  }


}
