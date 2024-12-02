using ArmyBackend.Repositories; // For ITrainingProgramRepository
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArmyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingProgramController : ControllerBase
    {
        private readonly ITrainingProgramRepository _trainingProgramRepository;

        public TrainingProgramController(ITrainingProgramRepository trainingProgramRepository)
        {
            _trainingProgramRepository = trainingProgramRepository;
        }

        // Get all training programs
        [HttpGet]
        public async Task<IActionResult> GetAllPrograms()
        {
            var programs = await _trainingProgramRepository.GetAllProgramsAsync();
            return Ok(programs);
        }

        // Get training program by ID
        [HttpGet("{programId}")]
        public async Task<IActionResult> GetProgramById(int programId)
        {
            var program = await _trainingProgramRepository.GetProgramByIdAsync(programId);
            if (program == null) return NotFound();

            return Ok(program);
        }

        // Get programs by VacancyId
        [HttpGet("vacancy/{vacancyId}")]
        public async Task<IActionResult> GetProgramsByVacancyId(int vacancyId)
        {
            var programs = await _trainingProgramRepository.GetProgramsByVacancyIdAsync(vacancyId);
            return Ok(programs);
        }

        // Create a new training program
        [HttpPost]
        public async Task<IActionResult> CreateProgram([FromBody] TrainingProgram program)
        {
            await _trainingProgramRepository.AddProgramAsync(program);
            await _trainingProgramRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProgramById), new { programId = program.ProgramId }, program);
        }

        // Update an existing training program
        [HttpPut("{programId}")]
        public async Task<IActionResult> UpdateProgram(int programId, [FromBody] TrainingProgram updatedProgram)
        {
            var program = await _trainingProgramRepository.GetProgramByIdAsync(programId);
            if (program == null) return NotFound();

            program.Title = updatedProgram.Title;
            program.Location = updatedProgram.Location;
            program.StartDate = updatedProgram.StartDate;
            program.EndDate = updatedProgram.EndDate;
            program.Trainer = updatedProgram.Trainer;
            program.Content = updatedProgram.Content;

            _trainingProgramRepository.UpdateProgram(program);
            await _trainingProgramRepository.SaveChangesAsync();

            return NoContent();
        }

        // Delete a training program
        [HttpDelete("{programId}")]
        public async Task<IActionResult> DeleteProgram(int programId)
        {
            var program = await _trainingProgramRepository.GetProgramByIdAsync(programId);
            if (program == null) return NotFound();

            _trainingProgramRepository.DeleteProgram(programId);
            await _trainingProgramRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
