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
public class ButtonRedirectController : ControllerBase
{
    private readonly dbContext _context;

    public ButtonRedirectController(dbContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "Administrador")]
    [HttpGet("LastId")]
    public async Task<ActionResult> GetLastIdButtonRedirect()
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var response = await _context.ButtonRedirects
                .OrderByDescending(b => b.IdButtonRedirect) 
                .FirstOrDefaultAsync(); 
            return StatusCode(200, new { Message= "Ultimo id obtenido con exito", idRedirect = response?.IdButtonRedirect});
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al obtener un boton de redireccion:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }
    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult> PostButtonRedirect([FromBody][Bind("ButtonLarge,ButtonHigh,ButtonWidth,PositionX,PositionY,PositionZ,RotationSideX,RotationSideY,RotationSideZ,HorientationButton")] ButtonRedirect buttonRedirectPost, [FromQuery] int idEscene = 0)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            if (idEscene != 0)
            {
                bool response = await _context.Escenes.AnyAsync(u => u.IdEscene == idEscene);
                if (!response)
                {
                    return StatusCode(400, "La escena de redireccion no pertenece a una escena existente, asegurese de dejar solo el campo de idEscene o proporcionar un id valido");
                }
                buttonRedirectPost.PageToSender = await _context.Escenes.Where(u => u.IdEscene == idEscene).FirstOrDefaultAsync();
                if (buttonRedirectPost.PageToSender != null)
                {
                    buttonRedirectPost.TargetEsceneId = buttonRedirectPost.PageToSender.IdEscene;
                }
            }
            await _context.ButtonRedirects.AddAsync(buttonRedirectPost);
            await _context.SaveChangesAsync();
            return StatusCode(200, new { message = "Boton de Redireccion Agregado Con Exito", buttonRedirectId = buttonRedirectPost.IdButtonRedirect });
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al agregar un nuevo boton:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutButtonRedirect(int id, [FromBody] ButtonRedirect buttonRedirectPut)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (id != buttonRedirectPut.IdButtonRedirect)
        {
            return StatusCode(400, "El id proporcionado no coincide con el id del boton de redireccion a modificar");
        }
        try
        {
            bool response = await _context.ButtonRedirects.AnyAsync(u => u.IdButtonRedirect == id);
            if (!response)
            {
                return StatusCode(400, "El boton de redireccion a modificar no existe");
            }
            ButtonRedirect buttonRedirect = await _context.ButtonRedirects.FirstAsync(u => u.IdButtonRedirect == id);
            if (buttonRedirect.PageToSender != buttonRedirectPut.PageToSender)
            {
                if (buttonRedirectPut.PageToSender != null)
                {
                    bool responseEscene = await _context.Escenes.AnyAsync(u => u.IdEscene == buttonRedirectPut.PageToSender.IdEscene);
                    if (!responseEscene)
                    {
                        return StatusCode(400, "La escena de redireccion a modificar no pertenece a una escena existente, asegurese de dejar solo el campo de idEscene o proporcionar un id valido");
                    }
                }
            }
            _context.ButtonRedirects.Update(buttonRedirectPut);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Boton de Redireccion Modificado Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al modificar un boton de redireccion:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteButtonRedirect(int id)
    {
        try
        {
            bool response = await _context.ButtonRedirects.AnyAsync(u => u.IdButtonRedirect == id);
            if (!response)
            {
                return StatusCode(400, "El boton de redireccion a eliminar no existe");
            }
            ButtonRedirect buttonRedirect = await _context.ButtonRedirects.FirstAsync(u => u.IdButtonRedirect == id);
            _context.ButtonRedirects.Remove(buttonRedirect);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Boton de Redireccion Eliminado Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al eliminar un boton de redireccion:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }
}
