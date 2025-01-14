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
public class ButtonInformationController : ControllerBase
{
    private readonly dbContext _context;
    public ButtonInformationController(dbContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult> PostButtonInformation([FromBody][Bind("ButtonLarge,ButtonHigh,ButtonWidth,PositionX,PositionY,PositionZ,RotationSideX,RotationSideY,RotationSideZ,OptionalImage,TextInformation")] ButtonInformation buttonInformationPost)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _context.ButtonInformations.AddAsync(buttonInformationPost);
            await _context.SaveChangesAsync();
            return StatusCode(200, new { message = "Boton de Informacion Agregado Con Exito", buttonRedirectId = buttonInformationPost.IdButtonInformation });
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
    public async Task<ActionResult> PutButtonInformation(int id, [FromBody] ButtonInformation buttonInformationPut)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (id != buttonInformationPut.IdButtonInformation)
        {
            return StatusCode(400, "El id proporcionado no coincide con el id del boton de informacion a modificar");
        }
        try
        {
            bool response = await _context.ButtonInformations.AnyAsync(u => u.IdButtonInformation == id);
            if (!response)
            {
                return StatusCode(400, "El boton de informacion a modificar no existe");
            }
            _context.ButtonInformations.Update(buttonInformationPut);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Boton de Informacion Modificado Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al modificar un boton de informacion:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteButtonInformation(int id)
    {
        try
        {
            bool response = await _context.ButtonInformations.AnyAsync(u => u.IdButtonInformation == id);
            if (!response)
            {
                return StatusCode(400, "El boton de informacion a eliminar no existe");
            }
            ButtonInformation buttonInformation = await _context.ButtonInformations.FirstAsync(u => u.IdButtonInformation == id);
            _context.ButtonInformations.Remove(buttonInformation);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Boton de Informacion Eliminado Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al eliminar un boton de informacion:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }
}
