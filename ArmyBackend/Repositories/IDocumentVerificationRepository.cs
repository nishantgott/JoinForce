using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface IDocumentVerificationRepository
    {
        Task<IEnumerable<DocumentVerification>> GetAllVerificationsAsync(); // Retrieve all verifications
        Task<DocumentVerification?> GetVerificationByIdAsync(int verificationId); // Retrieve a verification by ID
        Task<IEnumerable<DocumentVerification>> GetVerificationsByApplicationIdAsync(int applicationId); // Get verifications for a specific application
        Task AddVerificationAsync(DocumentVerification verification); // Add a new verification
        void UpdateVerification(DocumentVerification verification); // Update an existing verification
        void DeleteVerification(int verificationId); // Delete a verification by ID
        Task SaveChangesAsync(); // Save changes to the database
    }
}
