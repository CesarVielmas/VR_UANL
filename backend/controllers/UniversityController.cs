using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.DbContextData;
using Microsoft.AspNetCore.Authorization;
using backend.DTO;
[Route("api/[controller]")]
[ApiController]
public class UniversityController : ControllerBase
{
    private readonly dbContext _context;

    public UniversityController(dbContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<University>>> GetUniversitys()
    {
        List<University> universitiesReturn = await _context.Universities
            .Include(u => u.ListEscenes)
            .ThenInclude(escene => escene.ListButtonRed)
                .ThenInclude(buttonRedirect => buttonRedirect.PageToSender)
            .Include(u => u.ListEscenes)
            .ThenInclude(escene => escene.ListButtonInfo)
            .AsSplitQuery()
            .ToListAsync();
        return universitiesReturn;
    }

    [AllowAnonymous]
    [HttpGet("{FacultyName}")]
    public async Task<ActionResult<University>> GetUniversity(string FacultyName)
    {
        bool response = await _context.Universities.AnyAsync(u => u.NameFaculty == FacultyName);
        if (!response)
        {
            return StatusCode(400, "La universidad seleccionada no existe");
        }
        University universityReturn = await _context.Universities
        .Where(u => u.NameFaculty == FacultyName)
        .Include(u => u.ListEscenes)
            .ThenInclude(escene => escene.ListButtonRed)
                .ThenInclude(buttonRedirect => buttonRedirect.PageToSender)
        .Include(u => u.ListEscenes)
            .ThenInclude(escene => escene.ListButtonInfo)
        .AsSplitQuery()
        .FirstOrDefaultAsync();
        if (universityReturn == null)
        {
            return StatusCode(404, "La universidad seleccionada no existe");
        }
        return universityReturn;
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult> PostUniversity([FromBody][Bind("NameFaculty,NameCompleteFaculty,LogoFaculty,ImageFaculty")] University universityPost)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.Universities.AnyAsync(u => u.NameFaculty == universityPost.NameFaculty || u.NameCompleteFaculty == universityPost.NameCompleteFaculty);
            if (response)
            {
                return StatusCode(400, "La universidad a agregar ya existe");
            }
            await _context.Universities.AddAsync(universityPost);
            await _context.SaveChangesAsync();
            return StatusCode(200, new { Message = "Universidad Agregada Con Exito", id = universityPost.IdUniversity });
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al agregar una nueva universidad:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutUniversity(int id, [FromBody][Bind("IdUniversity,NameFaculty,NameCompleteFaculty,LogoFaculty,ImageFaculty")] University universityPut)
    {
        if (!ModelState.IsValid || id != universityPut.IdUniversity)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.Universities.AnyAsync(u => u.IdUniversity == id);
            if (!response)
            {
                return StatusCode(400, "La universidad a editar no existe");
            }
            _context.Universities.Update(universityPut);
            await _context.SaveChangesAsync();
            return StatusCode(200, new { Message = "Universidad Actualizada Con Exito", university = universityPut });
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al actualizar la universidad:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("Escene/{id}")]
    public async Task<ActionResult> PutUniversityScene(int id, [FromBody] EsceneRequestIdDTO esceneId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.Universities.AnyAsync(u => u.IdUniversity == id);
            if (!response)
            {
                return StatusCode(400, "La universidad a la que se le agregara la escena no existe");
            }
            bool responseEscene = await _context.Escenes.AnyAsync(e => e.IdEscene == esceneId.EsceneId);
            if (!responseEscene)
            {
                return StatusCode(400, "La escena a agregar no existe");
            }
            var university = await _context.Universities.FirstAsync(u => u.IdUniversity == id);
            var esceneToPut = await _context.Escenes.FirstAsync(e => e.IdEscene == esceneId.EsceneId);
            university.ListEscenes.Add(esceneToPut);
            _context.Universities.Update(university);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Universidad Actualizada Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al actualizar la universidad:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUniversity(int id)
    {
        bool response = await _context.Universities.AnyAsync(u => u.IdUniversity == id);
        if (!response)
        {
            return StatusCode(400, "La universidad a eliminar no existe");
        }
        try
        {
            var university = await _context.Universities.FirstAsync(u => u.IdUniversity == id);
            _context.Universities.Remove(university);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Universidad Eliminada Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al eliminar la universidad:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }
}
