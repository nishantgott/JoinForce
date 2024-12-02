using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class EvaluationReportRepository : IEvaluationReportRepository
    {
        private readonly ApplicationDbContext _context;

        public EvaluationReportRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all evaluation reports
        public async Task<IEnumerable<EvaluationReport>> GetAllReportsAsync()
        {
            return await _context.EvaluationReports.ToListAsync();
        }

        // Retrieve an evaluation report by ID
        public async Task<EvaluationReport?> GetReportByIdAsync(int reportId)
        {
            return await _context.EvaluationReports.FindAsync(reportId);
        }

        // Retrieve reports by UserId
        public async Task<IEnumerable<EvaluationReport>> GetReportsByUserIdAsync(int userId)
        {
            return await _context.EvaluationReports
                .Where(report => report.UserId == userId)
                .ToListAsync();
        }

        // Add a new evaluation report
        public async Task AddReportAsync(EvaluationReport report)
        {
            report.EvaluationDate = DateTime.Now; // Set evaluation date to now
            await _context.EvaluationReports.AddAsync(report);
        }

        // Update an existing evaluation report
        public void UpdateReport(EvaluationReport report)
        {
            _context.EvaluationReports.Update(report);
        }

        // Delete an evaluation report by ID
        public void DeleteReport(int reportId)
        {
            var report = _context.EvaluationReports.Find(reportId);
            if (report != null)
            {
                _context.EvaluationReports.Remove(report);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
