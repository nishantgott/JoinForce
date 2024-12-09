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
  filteredNotifications: UserNotification[] = [];
  userId: number = 0;
  activeFilter: 'unread' | 'read' = 'unread';

  constructor(private userNotificationsService: UserNotificationsService) { }

  ngOnInit(): void {
    this.loadUserNotifications();
  }

  loadUserNotifications(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.userId;
      }
    }

    if (this.userId) {
      this.userNotificationsService.getUserNotifications(this.userId).subscribe(
        (userNotifications) => {
          this.notifications = userNotifications.notifications.sort((a, b) =>
            new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime()
          );
          this.filterNotifications('unread'); // Default to 'unread'
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );
    } else {
      console.warn('User ID is not available.');
    }
  }

  filterNotifications(status: 'read' | 'unread'): void {
    this.activeFilter = status; // Set active filter
    this.filteredNotifications = this.notifications.filter(notification =>
      status === 'read' ? notification.readStatus : !notification.readStatus
    );
  }

  setActiveFilter(filter: 'read' | 'unread'): void {
    this.filterNotifications(filter); // Reuse filtering logic
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.notificationId === notificationId);
    if (notification) {
      notification.readStatus = true;
    }

    this.userNotificationsService.markNotificationAsRead(notificationId).subscribe(
      () => {
        console.log('Notification marked as read successfully.');
      },
      (error) => {
        console.error('Error marking notification as read:', error);
        if (notification) {
          notification.readStatus = false;
        }
      }
    );
  }

}
