using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IRecruitmentReportRepository
    {
        Task<IEnumerable<RecruitmentReport>> GetAllReportsAsync(); // Retrieve all reports
        Task<RecruitmentReport?> GetReportByIdAsync(int reportId); // Retrieve a report by ID
        Task<IEnumerable<RecruitmentReport>> GetReportsByVacancyIdAsync(int vacancyId); // Get reports for a specific vacancy
        Task AddReportAsync(RecruitmentReport report); // Add a new report
        void UpdateReport(RecruitmentReport report); // Update an existing report
        void DeleteReport(int reportId); // Delete a report by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
