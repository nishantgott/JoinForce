using ArmyBackend.Repositories; // For IRecruitmentReportRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecruitmentReportController : ControllerBase
    {
        private readonly IRecruitmentReportRepository _recruitmentReportRepository;

        public RecruitmentReportController(IRecruitmentReportRepository recruitmentReportRepository)
        {
            _recruitmentReportRepository = recruitmentReportRepository;
        }

        // Get all recruitment reports
        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _recruitmentReportRepository.GetAllReportsAsync();
            return Ok(reports);
        }

        // Get recruitment report by ID
        [HttpGet("{reportId}")]
        public async Task<IActionResult> GetReportById(int reportId)
        {
            var report = await _recruitmentReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            return Ok(report);
        }

        // Get reports by VacancyId
        [HttpGet("vacancy/{vacancyId}")]
        public async Task<IActionResult> GetReportsByVacancyId(int vacancyId)
        {
            var reports = await _recruitmentReportRepository.GetReportsByVacancyIdAsync(vacancyId);
            return Ok(reports);
        }

        // Create a new recruitment report
        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] RecruitmentReport report)
        {
            await _recruitmentReportRepository.AddReportAsync(report);
            await _recruitmentReportRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReportById), new { reportId = report.ReportId }, report);
        }

        // Update an existing recruitment report
        [HttpPut("{reportId}")]
        public async Task<IActionResult> UpdateReport(int reportId, [FromBody] RecruitmentReport updatedReport)
        {
            var report = await _recruitmentReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            report.ReportType = updatedReport.ReportType;
            report.Data = updatedReport.Data;
            report.GeneratedBy = updatedReport.GeneratedBy;

            _recruitmentReportRepository.UpdateReport(report);
            await _recruitmentReportRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a recruitment report
        [HttpDelete("{reportId}")]
        public async Task<IActionResult> DeleteReport(int reportId)
        {
            var report = await _recruitmentReportRepository.GetReportByIdAsync(reportId);
            if (report == null) return NotFound();

            _recruitmentReportRepository.DeleteReport(reportId);
            await _recruitmentReportRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
