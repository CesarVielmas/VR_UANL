using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.DbContextData;
[Route("api/[controller]")]
[ApiController]
public class EscenesController : ControllerBase
{
    private readonly dbContext _context;

    public EscenesController(dbContext context)
    {
        _context = context;
    }
    //ELIMINAR DESPUES YA QUE ESCENES YA VENDRA EN UNIVERSITYS
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Escene>>> GetEscenes()
    {
        return await _context.Escenes.ToListAsync();
    }
}
