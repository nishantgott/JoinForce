using System.ComponentModel.DataAnnotations;

public class TrainingProgram
{
    [Key]
    public int ProgramId { get; set; }
    public int VacancyId { get; set; }
    public string Title { get; set; }
    public string Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Trainer { get; set; }
    public string Content { get; set; }
}
