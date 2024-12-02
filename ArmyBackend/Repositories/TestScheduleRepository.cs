using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class TestScheduleRepository : ITestScheduleRepository
    {
        private readonly ApplicationDbContext _context;

        public TestScheduleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all test schedules
        public async Task<IEnumerable<TestSchedule>> GetAllTestSchedulesAsync()
        {
            return await _context.TestSchedules.ToListAsync();
        }

        // Retrieve a test schedule by ID
        public async Task<TestSchedule?> GetTestScheduleByIdAsync(int testId)
        {
            return await _context.TestSchedules.FindAsync(testId);
        }

        // Retrieve test schedules by ApplicationId
        public async Task<IEnumerable<TestSchedule>> GetTestSchedulesByApplicationIdAsync(int applicationId)
        {
            return await _context.TestSchedules
                .Where(ts => ts.ApplicationId == applicationId)
                .ToListAsync();
        }

        // Add a new test schedule
        public async Task AddTestScheduleAsync(TestSchedule testSchedule)
        {
            await _context.TestSchedules.AddAsync(testSchedule);
        }

        // Update an existing test schedule
        public void UpdateTestSchedule(TestSchedule testSchedule)
        {
            _context.TestSchedules.Update(testSchedule);
        }

        // Delete a test schedule by ID
        public void DeleteTestSchedule(int testId)
        {
            var testSchedule = _context.TestSchedules.Find(testId);
            if (testSchedule != null)
            {
                _context.TestSchedules.Remove(testSchedule);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
