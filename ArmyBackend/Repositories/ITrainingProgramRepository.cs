using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface ITrainingProgramRepository
    {
        Task<IEnumerable<TrainingProgram>> GetAllProgramsAsync(); // Retrieve all training programs
        Task<TrainingProgram?> GetProgramByIdAsync(int programId); // Retrieve a program by ID
        Task<IEnumerable<TrainingProgram>> GetProgramsByVacancyIdAsync(int vacancyId); // Get programs for a specific vacancy
        Task AddProgramAsync(TrainingProgram program); // Add a new program
        void UpdateProgram(TrainingProgram program); // Update an existing program
        void DeleteProgram(int programId); // Delete a program by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
