using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.DbContextData;
using Microsoft.AspNetCore.Authorization;
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
        return await _context.Universities.ToListAsync();
    }
    
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<University>>> GetUniversity(int id)
    {
        bool response = await _context.Universities.AnyAsync(u => u.IdUniversity == id);
        if (!response)
        {
            return StatusCode(400, "La universidad seleccionada no existe");
        }
        return await _context.Universities.Where(u => u.IdUniversity == id).ToListAsync();
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
            if(response)
            {
                return StatusCode(400, "La universidad a agregar ya existe");
            }
            await _context.Universities.AddAsync(universityPost);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Universidad Agregada Con Exito");
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
    
    [Authorize(Roles="Administrador")]
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

    [Authorize(Roles= "Administrador")]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutUniversityScene(int id, [FromBody] Escene esceneToPut)	
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
            bool responseEscene = await _context.Escenes.AnyAsync(e => e.IdEscene == esceneToPut.IdEscene);
            if (!responseEscene)
            {
                return StatusCode(400, "La escena a agregar no existe");
            }
            var university = await _context.Universities.FirstAsync(u => u.IdUniversity == id);
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
