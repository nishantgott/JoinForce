using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class TrainingProgramRepository : ITrainingProgramRepository
    {
        private readonly ApplicationDbContext _context;

        public TrainingProgramRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all training programs
        public async Task<IEnumerable<TrainingProgram>> GetAllProgramsAsync()
        {
            return await _context.TrainingPrograms.ToListAsync();
        }

        // Retrieve a program by ID
        public async Task<TrainingProgram?> GetProgramByIdAsync(int programId)
        {
            return await _context.TrainingPrograms.FindAsync(programId);
        }

        // Retrieve programs by VacancyId
        public async Task<IEnumerable<TrainingProgram>> GetProgramsByVacancyIdAsync(int vacancyId)
        {
            return await _context.TrainingPrograms
                .Where(program => program.VacancyId == vacancyId)
                .ToListAsync();
        }

        // Add a new training program
        public async Task AddProgramAsync(TrainingProgram program)
        {
            await _context.TrainingPrograms.AddAsync(program);
        }

        // Update an existing training program
        public void UpdateProgram(TrainingProgram program)
        {
            _context.TrainingPrograms.Update(program);
        }

        // Delete a training program by ID
        public void DeleteProgram(int programId)
        {
            var program = _context.TrainingPrograms.Find(programId);
            if (program != null)
            {
                _context.TrainingPrograms.Remove(program);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
