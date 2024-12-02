using ArmyBackend.Repositories; // For IDocumentVerificationRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentVerificationController : ControllerBase
    {
        private readonly IDocumentVerificationRepository _verificationRepository;

        public DocumentVerificationController(IDocumentVerificationRepository verificationRepository)
        {
            _verificationRepository = verificationRepository;
        }

        // Get all verifications
        [HttpGet]
        public async Task<IActionResult> GetAllVerifications()
        {
            var verifications = await _verificationRepository.GetAllVerificationsAsync();
            return Ok(verifications);
        }

        // Get verification by ID
        [HttpGet("{verificationId}")]
        public async Task<IActionResult> GetVerificationById(int verificationId)
        {
            var verification = await _verificationRepository.GetVerificationByIdAsync(verificationId);
            if (verification == null) return NotFound();

            return Ok(verification);
        }

        // Get verifications by ApplicationId
        [HttpGet("application/{applicationId}")]
        public async Task<IActionResult> GetVerificationsByApplicationId(int applicationId)
        {
            var verifications = await _verificationRepository.GetVerificationsByApplicationIdAsync(applicationId);
            return Ok(verifications);
        }

        // Create a new verification
        [HttpPost]
        public async Task<IActionResult> CreateVerification([FromBody] DocumentVerification verification)
        {
            await _verificationRepository.AddVerificationAsync(verification);
            await _verificationRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVerificationById), new { verificationId = verification.VerificationId }, verification);
        }

        // Update an existing verification
        [HttpPut("{verificationId}")]
        public async Task<IActionResult> UpdateVerification(int verificationId, [FromBody] DocumentVerification updatedVerification)
        {
            var verification = await _verificationRepository.GetVerificationByIdAsync(verificationId);
            if (verification == null) return NotFound();

            verification.DocumentType = updatedVerification.DocumentType;
            verification.VerificationStatus = updatedVerification.VerificationStatus;
            verification.Remarks = updatedVerification.Remarks;

            _verificationRepository.UpdateVerification(verification);
            await _verificationRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a verification
        [HttpDelete("{verificationId}")]
        public async Task<IActionResult> DeleteVerification(int verificationId)
        {
            var verification = await _verificationRepository.GetVerificationByIdAsync(verificationId);
            if (verification == null) return NotFound();

            _verificationRepository.DeleteVerification(verificationId);
            await _verificationRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
