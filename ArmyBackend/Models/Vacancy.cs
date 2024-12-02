using System.ComponentModel.DataAnnotations;

public class Vacancy
{
    [Key]
    public int VacancyId { get; set; }
    public string Title { get; set; }
    public string Role { get; set; }    // e.g. Soldier, Officer 5 roles
    public string EligibilityCriteria { get; set; }  // e.g. Must be 18 years old
    public string Location { get; set; }  // Take 5 locations
    public decimal Salary { get; set; }
    public int PostedBy { get; set; } // Recruiter UserId
    public DateTime DatePosted { get; set; }
    public string Status { get; set; } // Open, Closed

    // New properties
    public DateTime Deadline { get; set; }  // Deadline for application
    public int AppliedCount  { get; set; }  // Number of applications received
    public string JobDetails { get; set; }  // Detailed description of the job
    public int ExperienceMin { get; set; }  // Minimum experience required
    public int ExperienceMax { get; set; }  // Maximum experience required
}
