using System.Collections.Generic;
using System.Threading.Tasks; 

namespace ArmyBackend.Repositories
{
    public interface IVacancyRepository
    {
        Task<IEnumerable<Vacancy>> GetAllVacanciesAsync(); 
        Task<Vacancy?> GetVacancyByIdAsync(int id); 
        Task AddVacancyAsync(Vacancy vacancy);
        void UpdateVacancy(Vacancy vacancy); 
        void DeleteVacancy(int id); 
        Task SaveChangesAsync();
    }
}
