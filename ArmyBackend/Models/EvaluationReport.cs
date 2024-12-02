using System.ComponentModel.DataAnnotations;

public class EvaluationReport
{
    [Key]
    public int ReportId { get; set; }
    public int UserId { get; set; } // Candidate UserId
    public DateTime EvaluationDate { get; set; }
    public string PerformanceMetrics { get; set; } // Performance in written, physical, medical
    public string Comments { get; set; }
}
