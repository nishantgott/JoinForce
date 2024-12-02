using ArmyBackend.Repositories; // For IExamRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamController : ControllerBase
    {
        private readonly IExamRepository _examRepository;

        public ExamController(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }

        // Get all exams
        [HttpGet]
        public async Task<IActionResult> GetAllExams()
        {
            var exams = await _examRepository.GetAllExamsAsync();
            return Ok(exams);
        }

        // Get exam by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExamById(int id)
        {
            var exam = await _examRepository.GetExamByIdAsync(id);
            if (exam == null) return NotFound();

            return Ok(exam);
        }

        // Get exams by VacancyId
        [HttpGet("vacancy/{vacancyId}")]
        public async Task<IActionResult> GetExamsByVacancyId(int vacancyId)
        {
            var exams = await _examRepository.GetExamsByVacancyIdAsync(vacancyId);
            return Ok(exams);
        }

        // Create a new exam
        [HttpPost]
        public async Task<IActionResult> CreateExam([FromBody] Exam exam)
        {
            await _examRepository.AddExamAsync(exam);
            await _examRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExamById), new { id = exam.ExamId }, exam);
        }

        // Update an existing exam
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] Exam updatedExam)
        {
            var exam = await _examRepository.GetExamByIdAsync(id);
            if (exam == null) return NotFound();

            exam.ExamDate = updatedExam.ExamDate;
            exam.TotalMarks = updatedExam.TotalMarks;
            exam.PassingCriteria = updatedExam.PassingCriteria;

            _examRepository.UpdateExam(exam);
            await _examRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete an exam
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _examRepository.GetExamByIdAsync(id);
            if (exam == null) return NotFound();

            _examRepository.DeleteExam(id);
            await _examRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
