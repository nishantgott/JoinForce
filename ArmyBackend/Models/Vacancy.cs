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
}

//deadline
//applied
//JobDetails
//experienceMin
//experienceMax