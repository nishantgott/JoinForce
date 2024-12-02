using ArmyBackend.Repositories; // For IEvaluationReportRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EvaluationReportController : ControllerBase
    {
        private readonly IEvaluationReportRepository _evaluationReportRepository;

        public EvaluationReportController(IEvaluationReportRepository evaluationReportRepository)
        {
            _evaluationReportRepository = evaluationReportRepository;
        }

        // Get all evaluation reports
        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _evaluationReportRepository.GetAllReportsAsync();
            return Ok(reports);
        }

        // Get evaluation report by ID
        [HttpGet("{reportId}")]
        public async Task<IActionResult> GetReportById(int reportId)
        {
            var report = await _evaluationReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            return Ok(report);
        }

        // Get reports by UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReportsByUserId(int userId)
        {
            var reports = await _evaluationReportRepository.GetReportsByUserIdAsync(userId);
            return Ok(reports);
        }

        // Create a new evaluation report
        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] EvaluationReport report)
        {
            await _evaluationReportRepository.AddReportAsync(report);
            await _evaluationReportRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReportById), new { reportId = report.ReportId }, report);
        }

        // Update an existing evaluation report
        [HttpPut("{reportId}")]
        public async Task<IActionResult> UpdateReport(int reportId, [FromBody] EvaluationReport updatedReport)
        {
            var report = await _evaluationReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            report.PerformanceMetrics = updatedReport.PerformanceMetrics;
            report.Comments = updatedReport.Comments;

            _evaluationReportRepository.UpdateReport(report);
            await _evaluationReportRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete an evaluation report
        [HttpDelete("{reportId}")]
        public async Task<IActionResult> DeleteReport(int reportId)
        {
            var report = await _evaluationReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            _evaluationReportRepository.DeleteReport(reportId);
            await _evaluationReportRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
