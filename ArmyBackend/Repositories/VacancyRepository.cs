using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore; // For DbContext and EF operations
using System.Collections.Generic; // For IEnumerable
using System.Threading.Tasks; // For async/await

namespace ArmyBackend.Repositories
{
    public class VacancyRepository : IVacancyRepository
    {
        private readonly ApplicationDbContext _context;

        public VacancyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all vacancies
        public async Task<IEnumerable<Vacancy>> GetAllVacanciesAsync()
        {
            return await _context.Vacancies.ToListAsync();
        }

        // Retrieve a vacancy by ID
        public async Task<Vacancy?> GetVacancyByIdAsync(int id)
        {
            return await _context.Vacancies.FindAsync(id);
        }

        // Add a new vacancy
        public async Task AddVacancyAsync(Vacancy vacancy)
        {
            vacancy.DatePosted = DateTime.Now; // Set the date posted to now
            await _context.Vacancies.AddAsync(vacancy);
        }

        // Update an existing vacancy
        public void UpdateVacancy(Vacancy vacancy)
        {
            _context.Vacancies.Update(vacancy);
        }

        // Delete a vacancy by ID
        public void DeleteVacancy(int id)
        {
            var vacancy = _context.Vacancies.Find(id);
            if (vacancy != null)
            {
                _context.Vacancies.Remove(vacancy);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
