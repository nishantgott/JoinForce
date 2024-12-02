using System.ComponentModel.DataAnnotations;

public class PlatformAccess
{
    [Key]
    public int PlatformId { get; set; }
    public int UserId { get; set; } // User who accessed the platform
    public string DeviceType { get; set; } // e.g., Mobile, Desktop
    public DateTime LastAccessDate { get; set; }
    public string PreferredLanguage { get; set; }
}
