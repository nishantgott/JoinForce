using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IEvaluationReportRepository
    {
        Task<IEnumerable<EvaluationReport>> GetAllReportsAsync(); // Retrieve all reports
        Task<EvaluationReport?> GetReportByIdAsync(int reportId); // Retrieve a report by ID
        Task<IEnumerable<EvaluationReport>> GetReportsByUserIdAsync(int userId); // Get reports for a specific user
        Task AddReportAsync(EvaluationReport report); // Add a new report
        void UpdateReport(EvaluationReport report); // Update an existing report
        void DeleteReport(int reportId); // Delete a report by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
