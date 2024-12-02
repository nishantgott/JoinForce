using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all applications
        public async Task<IEnumerable<Application>> GetAllApplicationsAsync()
        {
            return await _context.Applications.ToListAsync();
        }

        // Retrieve an application by ID
        public async Task<Application?> GetApplicationByIdAsync(int id)
        {
            return await _context.Applications.FindAsync(id);
        }

        // Retrieve applications by UserId
        public async Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(int userId)
        {
            return await _context.Applications
                .Where(app => app.UserId == userId)
                .ToListAsync();
        }

        // Add a new application
        public async Task AddApplicationAsync(Application application)
        {
            application.SubmissionDate = DateTime.Now; // Set the submission date to now
            await _context.Applications.AddAsync(application);
        }

        // Update an existing application
        public void UpdateApplication(Application application)
        {
            _context.Applications.Update(application);
        }

        // Delete an application by ID
        public void DeleteApplication(int id)
        {
            var application = _context.Applications.Find(id);
            if (application != null)
            {
                _context.Applications.Remove(application);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
