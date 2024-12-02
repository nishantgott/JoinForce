using System.ComponentModel.DataAnnotations;

public class ExamResult
{
    [Key]
    public int ResultId { get; set; }
    public int ExamId { get; set; }
    public int UserId { get; set; } // Candidate UserId
    public int Score { get; set; }
    public string ResultStatus { get; set; } // Passed, Failed
}
