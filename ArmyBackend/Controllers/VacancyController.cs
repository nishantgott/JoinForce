using ArmyBackend.Repositories; // For IVacancyRepository
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VacancyController : ControllerBase
    {
        private readonly IVacancyRepository _vacancyRepository;

        public VacancyController(IVacancyRepository vacancyRepository)
        {
            _vacancyRepository = vacancyRepository;
        }

        // Get all vacancies
        [HttpGet]
        public async Task<IActionResult> GetAllVacancies()
        {
            var vacancies = await _vacancyRepository.GetAllVacanciesAsync();
            return Ok(vacancies);
        }

        // Get vacancy by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVacancyById(int id)
        {
            var vacancy = await _vacancyRepository.GetVacancyByIdAsync(id);
            if (vacancy == null) return NotFound();

            return Ok(vacancy);
        }

        // Add a new vacancy
        [HttpPost]
        public async Task<IActionResult> CreateVacancy([FromBody] Vacancy vacancy)
        {
            await _vacancyRepository.AddVacancyAsync(vacancy);
            await _vacancyRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVacancyById), new { id = vacancy.VacancyId }, vacancy);
        }

        // Update an existing vacancy
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVacancy(int id, [FromBody] Vacancy updatedVacancy)
        {
            var vacancy = await _vacancyRepository.GetVacancyByIdAsync(id);
            if (vacancy == null) return NotFound();

            vacancy.Title = updatedVacancy.Title;
            vacancy.Role = updatedVacancy.Role;
            vacancy.EligibilityCriteria = updatedVacancy.EligibilityCriteria;
            vacancy.Location = updatedVacancy.Location;
            vacancy.Salary = updatedVacancy.Salary;
            vacancy.Status = updatedVacancy.Status;

            _vacancyRepository.UpdateVacancy(vacancy);
            await _vacancyRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a vacancy
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacancy(int id)
        {
            var vacancy = await _vacancyRepository.GetVacancyByIdAsync(id);
            if (vacancy == null) return NotFound();

            _vacancyRepository.DeleteVacancy(id);
            await _vacancyRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
