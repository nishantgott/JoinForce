using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IExamRepository
    {
        Task<IEnumerable<Exam>> GetAllExamsAsync(); // Retrieve all exams
        Task<Exam?> GetExamByIdAsync(int id); // Retrieve an exam by ID
        Task<IEnumerable<Exam>> GetExamsByVacancyIdAsync(int vacancyId); // Get exams for a specific vacancy
        Task AddExamAsync(Exam exam); // Add a new exam
        void UpdateExam(Exam exam); // Update an existing exam
        void DeleteExam(int id); // Delete an exam by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
