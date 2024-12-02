using System.ComponentModel.DataAnnotations;

public class Exam
{
    [Key]
    public int ExamId { get; set; }
    public int VacancyId { get; set; }
    public DateTime ExamDate { get; set; }
    public int TotalMarks { get; set; }
    public int PassingCriteria { get; set; }
}
