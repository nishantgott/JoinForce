using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class RecruitmentReportRepository : IRecruitmentReportRepository
    {
        private readonly ApplicationDbContext _context;

        public RecruitmentReportRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all recruitment reports
        public async Task<IEnumerable<RecruitmentReport>> GetAllReportsAsync()
        {
            return await _context.RecruitmentReports.ToListAsync();
        }

        // Retrieve a recruitment report by ID
        public async Task<RecruitmentReport?> GetReportByIdAsync(int reportId)
        {
            return await _context.RecruitmentReports.FindAsync(reportId);
        }

        // Retrieve reports by VacancyId
        public async Task<IEnumerable<RecruitmentReport>> GetReportsByVacancyIdAsync(int vacancyId)
        {
            return await _context.RecruitmentReports
                .Where(report => report.VacancyId == vacancyId)
                .ToListAsync();
        }

        // Add a new recruitment report
        public async Task AddReportAsync(RecruitmentReport report)
        {
            report.DateGenerated = DateTime.Now; // Set the generation date to now
            await _context.RecruitmentReports.AddAsync(report);
        }

        // Update an existing recruitment report
        public void UpdateReport(RecruitmentReport report)
        {
            _context.RecruitmentReports.Update(report);
        }

        // Delete a recruitment report by ID
        public void DeleteReport(int reportId)
        {
            var report = _context.RecruitmentReports.Find(reportId);
            if (report != null)
            {
                _context.RecruitmentReports.Remove(report);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
