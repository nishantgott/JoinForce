using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IApplicationRepository
    {
        Task<IEnumerable<Application>> GetAllApplicationsAsync(); // Retrieve all applications
        Task<Application?> GetApplicationByIdAsync(int id); // Retrieve an application by ID
        Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(int userId); // Get applications for a specific user
        Task AddApplicationAsync(Application application); // Add a new application
        void UpdateApplication(Application application); // Update an existing application
        void DeleteApplication(int id); // Delete an application by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
