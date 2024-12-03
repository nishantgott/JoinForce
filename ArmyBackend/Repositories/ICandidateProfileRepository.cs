using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public interface ICandidateProfileRepository
    {
        Task<IEnumerable<CandidateProfile>> GetAllProfilesAsync(); // Retrieve all profiles
        Task<CandidateProfile?> GetProfileByIdAsync(int userId); // Retrieve a profile by UserId
        Task AddProfileAsync(CandidateProfile profile); // Add a new profile
        void UpdateProfile(CandidateProfile profile); // Update an existing profile
        void DeleteProfile(int userId); // Delete a profile by UserId
        Task SaveChangesAsync(); // Save changes to the database
        Task<CandidateProfile> GetProfileByActualUserIdAsync(int actualUserId);  //Retrieve profile by actual user id
    }
}
