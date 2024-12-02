using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IExamResultRepository
    {
        Task<IEnumerable<ExamResult>> GetAllExamResultsAsync(); // Retrieve all exam results
        Task<ExamResult?> GetExamResultByIdAsync(int id); // Retrieve an exam result by ID
        Task<IEnumerable<ExamResult>> GetResultsByExamIdAsync(int examId); // Get results for a specific exam
        Task<IEnumerable<ExamResult>> GetResultsByUserIdAsync(int userId); // Get results for a specific user
        Task AddExamResultAsync(ExamResult examResult); // Add a new exam result
        void UpdateExamResult(ExamResult examResult); // Update an existing exam result
        void DeleteExamResult(int id); // Delete an exam result by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
