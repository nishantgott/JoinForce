using ArmyBackend.Data; // For ApplicationDbContext
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Repositories
{
    public class CandidateProfileRepository : ICandidateProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public CandidateProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all candidate profiles
        public async Task<IEnumerable<CandidateProfile>> GetAllProfilesAsync()
        {
            return await _context.CandidateProfiles.ToListAsync();
        }

        // Retrieve a candidate profile by UserId
        public async Task<CandidateProfile?> GetProfileByIdAsync(int userId)
        {
            return await _context.CandidateProfiles.FindAsync(userId);
        }

        // Add a new candidate profile
        public async Task AddProfileAsync(CandidateProfile profile)
        {
            await _context.CandidateProfiles.AddAsync(profile);
        }

        // Update an existing candidate profile
        public void UpdateProfile(CandidateProfile profile)
        {
            _context.CandidateProfiles.Update(profile);
        }

        // Delete a candidate profile by UserId
        public void DeleteProfile(int userId)
        {
            var profile = _context.CandidateProfiles.Find(userId);
            if (profile != null)
            {
                _context.CandidateProfiles.Remove(profile);
            }
        }

        // Save changes to the database
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
