using System.ComponentModel.DataAnnotations;

public class UserNotifications
{
    [Key]
    public int UserNotificationsId { get; set; } // Primary key for the UserNotifications table
    public int UserId { get; set; }  // Foreign key to User table
    public List<Notification> Notifications { get; set; } // List of notifications related to the user
}