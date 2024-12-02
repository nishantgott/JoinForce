using ArmyBackend.Repositories; // For IApplicationRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationRepository _applicationRepository;

        public ApplicationController(IApplicationRepository applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }

        // Get all applications
        [HttpGet]
        public async Task<IActionResult> GetAllApplications()
        {
            var applications = await _applicationRepository.GetAllApplicationsAsync();
            return Ok(applications);
        }

        // Get application by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplicationById(int id)
        {
            var application = await _applicationRepository.GetApplicationByIdAsync(id);
            if (application == null) return NotFound();

            return Ok(application);
        }

        // Get applications by UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetApplicationsByUserId(int userId)
        {
            var applications = await _applicationRepository.GetApplicationsByUserIdAsync(userId);
            return Ok(applications);
        }

        // Create a new application
        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromBody] Application application)
        {
            await _applicationRepository.AddApplicationAsync(application);
            await _applicationRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetApplicationById), new { id = application.ApplicationId }, application);
        }

        // Update an application
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplication(int id, [FromBody] Application updatedApplication)
        {
            var application = await _applicationRepository.GetApplicationByIdAsync(id);
            if (application == null) return NotFound();

            application.ApplicationStatus = updatedApplication.ApplicationStatus;
            application.DocumentsSubmitted = updatedApplication.DocumentsSubmitted;

            _applicationRepository.UpdateApplication(application);
            await _applicationRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete an application
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var application = await _applicationRepository.GetApplicationByIdAsync(id);
            if (application == null) return NotFound();

            _applicationRepository.DeleteApplication(id);
            await _applicationRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
