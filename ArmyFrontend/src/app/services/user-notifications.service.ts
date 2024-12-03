import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserNotification {
  notificationId: number;
  userId: number;
  message: string;
  dateSent: Date;
  notificationType: string;
  readStatus: boolean;
}

export interface UserNotifications {
  userNotificationsId: number;
  userId: number;
  notifications: UserNotification[];
}

@Injectable({
  providedIn: 'root',
})
export class UserNotificationsService {
  private apiUrl = `http://localhost:5113/api/UserNotifications`;

  constructor(private http: HttpClient) { }

  // Get notifications for a specific user
  getUserNotifications(userId: number): Observable<UserNotifications> {
    return this.http.get<UserNotifications>(`${this.apiUrl}/${userId}`);
  }

  // Add notifications to a user
  addUserNotifications(userId: number, notification: UserNotification): Observable<UserNotifications> {
    return this.http.post<UserNotifications>(this.apiUrl, notification, {
      params: { userId: userId.toString() },
    });
  }

  // Send notification to all users
  sendNotificationToAll(notification: UserNotification): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-to-all`, notification);
  }

  // Mark a notification as read
  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/mark-as-read/${notificationId}`, {});
  }
}
