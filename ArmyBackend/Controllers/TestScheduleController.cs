using ArmyBackend.Repositories; // For ITestScheduleRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestScheduleController : ControllerBase
    {
        private readonly ITestScheduleRepository _testScheduleRepository;

        public TestScheduleController(ITestScheduleRepository testScheduleRepository)
        {
            _testScheduleRepository = testScheduleRepository;
        }

        // Get all test schedules
        [HttpGet]
        public async Task<IActionResult> GetAllTestSchedules()
        {
            var schedules = await _testScheduleRepository.GetAllTestSchedulesAsync();
            return Ok(schedules);
        }

        // Get test schedule by ID
        [HttpGet("{testId}")]
        public async Task<IActionResult> GetTestScheduleById(int testId)
        {
            var schedule = await _testScheduleRepository.GetTestScheduleByIdAsync(testId);
            if (schedule == null) return NotFound();

            return Ok(schedule);
        }

        // Get test schedules by ApplicationId
        [HttpGet("application/{applicationId}")]
        public async Task<IActionResult> GetTestSchedulesByApplicationId(int applicationId)
        {
            var schedules = await _testScheduleRepository.GetTestSchedulesByApplicationIdAsync(applicationId);
            return Ok(schedules);
        }

        // Create a new test schedule
        [HttpPost]
        public async Task<IActionResult> CreateTestSchedule([FromBody] TestSchedule testSchedule)
        {
            await _testScheduleRepository.AddTestScheduleAsync(testSchedule);
            await _testScheduleRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTestScheduleById), new { testId = testSchedule.TestId }, testSchedule);
        }

        // Update an existing test schedule
        [HttpPut("{testId}")]
        public async Task<IActionResult> UpdateTestSchedule(int testId, [FromBody] TestSchedule updatedSchedule)
        {
            var schedule = await _testScheduleRepository.GetTestScheduleByIdAsync(testId);
            if (schedule == null) return NotFound();

            schedule.TestType = updatedSchedule.TestType;
            schedule.Date = updatedSchedule.Date;
            schedule.Location = updatedSchedule.Location;
            schedule.Status = updatedSchedule.Status;

            _testScheduleRepository.UpdateTestSchedule(schedule);
            await _testScheduleRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a test schedule
        [HttpDelete("{testId}")]
        public async Task<IActionResult> DeleteTestSchedule(int testId)
        {
            var schedule = await _testScheduleRepository.GetTestScheduleByIdAsync(testId);
            if (schedule == null) return NotFound();

            _testScheduleRepository.DeleteTestSchedule(testId);
            await _testScheduleRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
