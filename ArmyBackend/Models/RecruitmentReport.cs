using System.ComponentModel.DataAnnotations;

public class RecruitmentReport
{
    [Key]
    public int ReportId { get; set; }
    public int VacancyId { get; set; }
    public string ReportType { get; set; } // e.g., VacancySummary, CandidateStatistics
    public string Data { get; set; } // JSON or stringified data
    public DateTime DateGenerated { get; set; }
    public int GeneratedBy { get; set; } // Admin UserId
}
