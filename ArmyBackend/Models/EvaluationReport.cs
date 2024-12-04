using System.ComponentModel.DataAnnotations;

public class EvaluationReport
{
    [Key]
    public int ReportId { get; set; }
    public int UserId { get; set; } // Candidate UserId
    public DateTime EvaluationDate { get; set; }
    public string PerformanceMetrics { get; set; } // Pass, Fail
    public string Comments { get; set; }
    
    // Newly added fields
    public int Score { get; set; }
    public DateTime TestDate { get; set; }
    public string TestType { get; set; } // Type of test (e.g., Physical, Medical)
    public int ApplicationId { get; set; } // Associated Application Id
}
