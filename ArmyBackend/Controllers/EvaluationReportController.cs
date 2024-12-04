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
            // Retrieve the existing report
            var report = await _evaluationReportRepository.GetReportByIdAsync(reportId);
            
            // If the report doesn't exist, return NotFound
            if (report == null) return NotFound();

            // Update the fields
            report.PerformanceMetrics = updatedReport.PerformanceMetrics;
            report.Comments = updatedReport.Comments;
            
            // Add updates for the new fields
            report.Score = updatedReport.Score;
            report.TestDate = updatedReport.TestDate;
            report.TestType = updatedReport.TestType;
            report.ApplicationId = updatedReport.ApplicationId;

            // Update the report in the repository
            _evaluationReportRepository.UpdateReport(report);
            
            // Save changes asynchronously
            await _evaluationReportRepository.SaveChangesAsync();

            // Return NoContent (successful update)
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
