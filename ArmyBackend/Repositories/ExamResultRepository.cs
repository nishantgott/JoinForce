using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class ExamResultRepository : IExamResultRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamResultRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all exam results
        public async Task<IEnumerable<ExamResult>> GetAllExamResultsAsync()
        {
            return await _context.ExamResults.ToListAsync();
        }

        // Retrieve an exam result by ID
        public async Task<ExamResult?> GetExamResultByIdAsync(int id)
        {
            return await _context.ExamResults.FindAsync(id);
        }

        // Retrieve results by ExamId
        public async Task<IEnumerable<ExamResult>> GetResultsByExamIdAsync(int examId)
        {
            return await _context.ExamResults
                .Where(result => result.ExamId == examId)
                .ToListAsync();
        }

        // Retrieve results by UserId
        public async Task<IEnumerable<ExamResult>> GetResultsByUserIdAsync(int userId)
        {
            return await _context.ExamResults
                .Where(result => result.UserId == userId)
                .ToListAsync();
        }

        // Add a new exam result
        public async Task AddExamResultAsync(ExamResult examResult)
        {
            await _context.ExamResults.AddAsync(examResult);
        }

        // Update an existing exam result
        public void UpdateExamResult(ExamResult examResult)
        {
            _context.ExamResults.Update(examResult);
        }

        // Delete an exam result by ID
        public void DeleteExamResult(int id)
        {
            var examResult = _context.ExamResults.Find(id);
            if (examResult != null)
            {
                _context.ExamResults.Remove(examResult);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
