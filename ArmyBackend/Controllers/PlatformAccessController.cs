using ArmyBackend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformAccessController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlatformAccessController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PlatformAccess
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlatformAccess>>> GetPlatformAccesses()
        {
            return await _context.PlatformAccesses.ToListAsync();
        }

        // GET: api/PlatformAccess/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlatformAccess>> GetPlatformAccess(int id)
        {
            var platformAccess = await _context.PlatformAccesses.FindAsync(id);

            if (platformAccess == null)
            {
                return NotFound();
            }

            return platformAccess;
        }

        // PUT: api/PlatformAccess/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlatformAccess(int id, PlatformAccess platformAccess)
        {
            if (id != platformAccess.PlatformId)
            {
                return BadRequest();
            }

            _context.Entry(platformAccess).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlatformAccessExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PlatformAccess
        [HttpPost]
        public async Task<ActionResult<PlatformAccess>> PostPlatformAccess(PlatformAccess platformAccess)
        {
            _context.PlatformAccesses.Add(platformAccess);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlatformAccess", new { id = platformAccess.PlatformId }, platformAccess);
        }

        // DELETE: api/PlatformAccess/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlatformAccess(int id)
        {
            var platformAccess = await _context.PlatformAccesses.FindAsync(id);
            if (platformAccess == null)
            {
                return NotFound();
            }

            _context.PlatformAccesses.Remove(platformAccess);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlatformAccessExists(int id)
        {
            return _context.PlatformAccesses.Any(e => e.PlatformId == id);
        }
    }
}
