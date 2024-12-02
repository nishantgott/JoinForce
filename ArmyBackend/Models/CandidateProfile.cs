using System.ComponentModel.DataAnnotations;

public class CandidateProfile
{
    [Key]
    public int UserId { get; set; } // Candidate UserId
    public string FullName { get; set; }
    public DateTime DOB { get; set; }
    public string Qualifications { get; set; }
    public string Experience { get; set; }
    public string ProfilePicture { get; set; } // URL to profile picture
    public string MilitaryBackground { get; set; }
}
