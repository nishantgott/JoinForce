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

    // New fields
    public int ApplicationCount { get; set; } = 0;
    public int ReviewedCount { get; set; } = 0;
    public int SelectedCount { get; set; } = 0;
    public int ShortlistedCount { get; set; } = 0;
    public int RejectedCount { get; set; } = 0;
    public int PendingCount { get; set; } = 0;
    public int ExamTakenCount { get; set; } = 0;
    public int ExamPassCount { get; set; } = 0;
    public int ExamFailCount { get; set; } = 0;
    public double ExamAverageMarks { get; set; } = 0;
}
