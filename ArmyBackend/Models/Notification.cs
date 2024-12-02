using System.ComponentModel.DataAnnotations;

public class Notification
{
    [Key]
    public int NotificationId { get; set; }
    public int UserId { get; set; } // User who will receive the notification
    public string Message { get; set; }
    public DateTime DateSent { get; set; }
    public string NotificationType { get; set; } // e.g., TestSchedule, ApplicationStatus
    public bool ReadStatus { get; set; }
}
