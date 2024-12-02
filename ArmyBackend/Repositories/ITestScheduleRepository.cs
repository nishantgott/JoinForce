using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface ITestScheduleRepository
    {
        Task<IEnumerable<TestSchedule>> GetAllTestSchedulesAsync(); // Retrieve all test schedules
        Task<TestSchedule?> GetTestScheduleByIdAsync(int testId); // Retrieve a test schedule by ID
        Task<IEnumerable<TestSchedule>> GetTestSchedulesByApplicationIdAsync(int applicationId); // Get test schedules for a specific application
        Task AddTestScheduleAsync(TestSchedule testSchedule); // Add a new test schedule
        void UpdateTestSchedule(TestSchedule testSchedule); // Update an existing test schedule
        void DeleteTestSchedule(int testId); // Delete a test schedule by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
