using System.ComponentModel.DataAnnotations;

public class Application
{
    [Key]
    public int ApplicationId { get; set; }
    public int UserId { get; set; } // Candidate UserId
    public int VacancyId { get; set; }
    public string ApplicationStatus { get; set; } // Submitted, Shortlisted, Rejected, Selected
    public DateTime SubmissionDate { get; set; }
    public bool DocumentsSubmitted { get; set; }
}
