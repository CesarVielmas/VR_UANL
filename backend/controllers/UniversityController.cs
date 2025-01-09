using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.DbContextData;
[Route("api/[controller]")]
[ApiController]
public class UniversityController : ControllerBase
{
    private readonly dbContext _context;

    public UniversityController(dbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<University>>> GetUniversitys()
    {
        return await _context.Universities.ToListAsync();
    }
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
    [HttpPost]
    public async Task<ActionResult> PostUniversity([FromBody][Bind("NameFaculty,NameCompleteFaculty,LogoFaculty,ImageFaculty")] University universityPost)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
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
}
