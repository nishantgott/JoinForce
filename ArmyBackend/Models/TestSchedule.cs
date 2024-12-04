using System.ComponentModel.DataAnnotations;

public class TestSchedule
{
    [Key]
    public int TestId { get; set; }
    public int ApplicationId { get; set; }
    public string TestType { get; set; } // Physical, Medical
    public DateTime Date { get; set; }
    public string Location { get; set; }
    public string Status { get; set; } // Scheduled, Passed, Failed
    public int UserId { get; set; }
}
