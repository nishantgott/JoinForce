using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

    public class Question
    {
        [Key]
        public int QuestionId { get; set; } // Primary Key for the Question
        public string QuestionContent { get; set; }

        [Required]
        public int VacancyId { get; set; }  // Foreign Key to the Vacancy

        public string SenderName { get; set; }  // Name of the sender

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // Time when the question was created
    }

