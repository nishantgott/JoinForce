using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourProjectNamespace.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }  // Primary Key for the Answer
        public string AnswerContent { get; set; }

        [Required]
        public int QuestionId { get; set; }  // Foreign Key to the Question

        public string SenderName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // Timestamp for when the answer was created

    }
}
