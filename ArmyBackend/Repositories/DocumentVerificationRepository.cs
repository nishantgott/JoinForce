using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class DocumentVerificationRepository : IDocumentVerificationRepository
    {
        private readonly ApplicationDbContext _context;

        public DocumentVerificationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all verifications
        public async Task<IEnumerable<DocumentVerification>> GetAllVerificationsAsync()
        {
            return await _context.DocumentVerifications.ToListAsync();
        }

        // Retrieve a verification by ID
        public async Task<DocumentVerification?> GetVerificationByIdAsync(int verificationId)
        {
            return await _context.DocumentVerifications.FindAsync(verificationId);
        }

        // Retrieve verifications by ApplicationId
        public async Task<IEnumerable<DocumentVerification>> GetVerificationsByApplicationIdAsync(int applicationId)
        {
            return await _context.DocumentVerifications
                .Where(v => v.ApplicationId == applicationId)
                .ToListAsync();
        }

        // Add a new verification
        public async Task AddVerificationAsync(DocumentVerification verification)
        {
            await _context.DocumentVerifications.AddAsync(verification);
        }

        // Update an existing verification
        public void UpdateVerification(DocumentVerification verification)
        {
            _context.DocumentVerifications.Update(verification);
        }

        // Delete a verification by ID
        public void DeleteVerification(int verificationId)
        {
            var verification = _context.DocumentVerifications.Find(verificationId);
            if (verification != null)
            {
                _context.DocumentVerifications.Remove(verification);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
