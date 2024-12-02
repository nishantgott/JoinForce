using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class ExamRepository : IExamRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all exams
        public async Task<IEnumerable<Exam>> GetAllExamsAsync()
        {
            return await _context.Exams.ToListAsync();
        }

        // Retrieve an exam by ID
        public async Task<Exam?> GetExamByIdAsync(int id)
        {
            return await _context.Exams.FindAsync(id);
        }

        // Retrieve exams by VacancyId
        public async Task<IEnumerable<Exam>> GetExamsByVacancyIdAsync(int vacancyId)
        {
            return await _context.Exams
                .Where(exam => exam.VacancyId == vacancyId)
                .ToListAsync();
        }

        // Add a new exam
        public async Task AddExamAsync(Exam exam)
        {
            await _context.Exams.AddAsync(exam);
        }

        // Update an existing exam
        public void UpdateExam(Exam exam)
        {
            _context.Exams.Update(exam);
        }

        // Delete an exam by ID
        public void DeleteExam(int id)
        {
            var exam = _context.Exams.Find(id);
            if (exam != null)
            {
                _context.Exams.Remove(exam);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
