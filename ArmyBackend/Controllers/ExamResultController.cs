using ArmyBackend.Repositories; // For IExamResultRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamResultController : ControllerBase
    {
        private readonly IExamResultRepository _examResultRepository;

        public ExamResultController(IExamResultRepository examResultRepository)
        {
            _examResultRepository = examResultRepository;
        }

        // Get all exam results
        [HttpGet]
        public async Task<IActionResult> GetAllExamResults()
        {
            var results = await _examResultRepository.GetAllExamResultsAsync();
            return Ok(results);
        }

        // Get exam result by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExamResultById(int id)
        {
            var result = await _examResultRepository.GetExamResultByIdAsync(id);
            if (result == null) return NotFound();

            return Ok(result);
        }

        // Get results by ExamId
        [HttpGet("exam/{examId}")]
        public async Task<IActionResult> GetResultsByExamId(int examId)
        {
            var results = await _examResultRepository.GetResultsByExamIdAsync(examId);
            return Ok(results);
        }

        // Get results by UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetResultsByUserId(int userId)
        {
            var results = await _examResultRepository.GetResultsByUserIdAsync(userId);
            return Ok(results);
        }

        // Create a new exam result
        [HttpPost]
        public async Task<IActionResult> CreateExamResult([FromBody] ExamResult examResult)
        {
            await _examResultRepository.AddExamResultAsync(examResult);
            await _examResultRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExamResultById), new { id = examResult.ResultId }, examResult);
        }

        // Update an existing exam result
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExamResult(int id, [FromBody] ExamResult updatedExamResult)
        {
            var examResult = await _examResultRepository.GetExamResultByIdAsync(id);
            if (examResult == null) return NotFound();

            examResult.Score = updatedExamResult.Score;
            examResult.ResultStatus = updatedExamResult.ResultStatus;

            _examResultRepository.UpdateExamResult(examResult);
            await _examResultRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete an exam result
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamResult(int id)
        {
            var examResult = await _examResultRepository.GetExamResultByIdAsync(id);
            if (examResult == null) return NotFound();

            _examResultRepository.DeleteExamResult(id);
            await _examResultRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
