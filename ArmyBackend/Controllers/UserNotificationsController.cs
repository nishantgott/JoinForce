using ArmyBackend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserNotificationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public UserNotificationsController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // Get notifications for a specific user
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserNotifications(int userId)
    {
        var userNotifications = await _context.UserNotifications
            .Include(un => un.Notifications)
            .Where(un => un.UserId == userId)
            .FirstOrDefaultAsync();

        if (userNotifications == null)
        {
            return NotFound();
        }

        return Ok(userNotifications);
    }

    // Add notifications to a user
    [HttpPost]
    public async Task<IActionResult> AddUserNotifications(int userId, [FromBody] Notification notification)
    {
        if (notification == null)
        {
            return BadRequest("Notification data is required.");
        }

        // Check if the user exists
        var userNotifications = await _context.UserNotifications
            .Include(un => un.Notifications)
            .FirstOrDefaultAsync(un => un.UserId == userId);

        if (userNotifications == null)
        {
            // If no UserNotifications entry exists for the user, create a new one
            userNotifications = new UserNotifications
            {
                UserId = userId,
                Notifications = new List<Notification>
                {
                    new Notification
                    {
                        UserId = userId,
                        Message = notification.Message,
                        DateSent = notification.DateSent,
                        NotificationType = notification.NotificationType,
                        ReadStatus = false
                    }
                }
            };

            // Add new UserNotifications entry
            _context.UserNotifications.Add(userNotifications);
        }
        else
        {
            // If UserNotifications entry exists, add the new notification
            userNotifications.Notifications.Add(new Notification
            {
                UserId = userId,
                Message = notification.Message,
                DateSent = notification.DateSent,
                NotificationType = notification.NotificationType,
                ReadStatus = false
            });

            // Update the existing UserNotifications entry with the new notification
            _context.UserNotifications.Update(userNotifications);
        }

        // Save the changes to the database
        await _context.SaveChangesAsync();

        // Mailgun integration for email sending
        bool emailSent = await SendEmailUsingMailgun(notification.Message, userId);

        if (emailSent)
        {
            return CreatedAtAction(nameof(GetUserNotifications), new { userId = userId }, userNotifications);
        }
        else
        {
            return StatusCode(500, "Failed to send email.");
        }
    }

    private async Task<bool> SendEmailUsingMailgun(string message, int userId)
    {
        // Get Mailgun configuration values from the app settings
        var apiKey = _configuration["Mailgun:ApiKey"];
        var domain = _configuration["Mailgun:Domain"];
        var fromEmail = _configuration["Mailgun:FromEmail"];
        var fromName = _configuration["Mailgun:FromName"];

        var client = new RestClient(new RestClientOptions($"https://api.mailgun.net/v3/{domain}/messages")
        {
            Authenticator = new HttpBasicAuthenticator("api", apiKey)
        });

        // Here, we assume that you have user email from the database, replace with actual data
        var userEmail = "nishantgk2004@gmail.com"; // Replace with actual email from the user

        var request = new RestRequest();
        request.AddParameter("from", $"{fromName} <{fromEmail}>");
        request.AddParameter("to", "nishantgk2004@gmail.com"); // Use actual user's email
        request.AddParameter("subject", "New Notification");
        request.AddParameter("text", message);
        request.AddParameter("html", $"<p>{message}</p>");

        var response = await client.ExecutePostAsync(request);

        // Check response status code
        return response.StatusCode == System.Net.HttpStatusCode.OK;
    }

    // Send notification to all users
    [HttpPost("send-to-all")]
    public async Task<IActionResult> SendNotificationToAllUsers([FromBody] Notification notification)
    {
        if (notification == null)
        {
            return BadRequest("Notification data is required.");
        }

        // Fetch all users from the database
        var users = await _context.Users.ToListAsync();

        if (users == null || users.Count == 0)
        {
            return NotFound("No users found.");
        }

        // For each user, check if they already have notifications, otherwise create a new list
        foreach (var user in users)
        {
            var userNotifications = await _context.UserNotifications
                .Include(un => un.Notifications)
                .Where(un => un.UserId == user.UserId)
                .FirstOrDefaultAsync();

            if (userNotifications == null)
            {
                // If no existing notifications for the user, create a new UserNotifications entry
                userNotifications = new UserNotifications
                {
                    UserId = user.UserId,
                    Notifications = new List<Notification>
                    {
                        new Notification
                        {
                            UserId = user.UserId,
                            Message = notification.Message,
                            DateSent = notification.DateSent,
                            NotificationType = notification.NotificationType,
                            ReadStatus = false
                        }
                    }
                };

                // Add the new UserNotifications entry to the database
                _context.UserNotifications.Add(userNotifications);
            }
            else
            {
                // If UserNotifications already exists, just append the new notification to the existing list
                userNotifications.Notifications.Add(new Notification
                {
                    UserId = user.UserId,
                    Message = notification.Message,
                    DateSent = notification.DateSent,
                    NotificationType = notification.NotificationType,
                    ReadStatus = false
                });

                // Update the UserNotifications entry with the new notification
                _context.UserNotifications.Update(userNotifications);
            }
        }

        // Save all changes to the database
        await _context.SaveChangesAsync();

        return Ok("Notifications sent to all users.");
    }

    [HttpPatch("mark-as-read/{notificationId}")]
    public async Task<IActionResult> MarkNotificationAsRead(int notificationId)
    {
        // Find the notification by its ID
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.NotificationId == notificationId);

        if (notification == null)
        {
            return NotFound("Notification not found.");
        }

        // Mark the notification as read
        notification.ReadStatus = true;

        // Save the changes to the database
        await _context.SaveChangesAsync();

        return Ok("Notification marked as read.");
    }
}