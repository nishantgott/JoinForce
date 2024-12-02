using ArmyBackend.Repositories; // For ICandidateProfileRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateProfileController : ControllerBase
    {
        private readonly ICandidateProfileRepository _candidateProfileRepository;

        public CandidateProfileController(ICandidateProfileRepository candidateProfileRepository)
        {
            _candidateProfileRepository = candidateProfileRepository;
        }

        // Get all profiles
        [HttpGet]
        public async Task<IActionResult> GetAllProfiles()
        {
            var profiles = await _candidateProfileRepository.GetAllProfilesAsync();
            return Ok(profiles);
        }

        // Get profile by UserId
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetProfileById(int userId)
        {
            var profile = await _candidateProfileRepository.GetProfileByIdAsync(userId);
            if (profile == null) return NotFound();

            return Ok(profile);
        }

        // Create a new profile
        [HttpPost]
        public async Task<IActionResult> CreateProfile([FromBody] CandidateProfile profile)
        {
            await _candidateProfileRepository.AddProfileAsync(profile);
            await _candidateProfileRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfileById), new { userId = profile.UserId }, profile);
        }

        // Update an existing profile
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, [FromBody] CandidateProfile updatedProfile)
        {
            var profile = await _candidateProfileRepository.GetProfileByIdAsync(userId);
            if (profile == null) return NotFound();

            profile.FullName = updatedProfile.FullName;
            profile.DOB = updatedProfile.DOB;
            profile.Qualifications = updatedProfile.Qualifications;
            profile.Experience = updatedProfile.Experience;
            profile.ProfilePicture = updatedProfile.ProfilePicture;
            profile.MilitaryBackground = updatedProfile.MilitaryBackground;

            _candidateProfileRepository.UpdateProfile(profile);
            await _candidateProfileRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a profile
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteProfile(int userId)
        {
            var profile = await _candidateProfileRepository.GetProfileByIdAsync(userId);
            if (profile == null) return NotFound();

            _candidateProfileRepository.DeleteProfile(userId);
            await _candidateProfileRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
