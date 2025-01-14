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
public class EsceneController : ControllerBase
{
    private readonly dbContext _context;

    public EsceneController(dbContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult> PostEscenes([FromBody][Bind("NamePositionScene,NameScene,ImageScene")] EscenePostDTO escenesPost, [FromQuery] int idUniversity)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.Escenes.AnyAsync(u => u.NameScene == escenesPost.NameScene || u.NamePositionScene == escenesPost.NamePositionScene);
            if (response)
            {
                return StatusCode(400, "La escena a agregar ya corresponde a un nombre existente");
            }
            bool responseImage = await _context.Escenes.AnyAsync(u => u.ImageScene == escenesPost.ImageScene);
            if (responseImage)
            {
                return StatusCode(400, "La imagen de la escena a agregar ya existe");
            }
            bool responseUniversity = await _context.Universities.AnyAsync(u => u.IdUniversity == idUniversity);
            if (!responseUniversity)
            {
                return StatusCode(400, "La universidad seleccionada para agregar a la escena no existe");
            }
            University university = await _context.Universities.FirstAsync(u => u.IdUniversity == idUniversity);
            Escene esceneSend = new Escene
            {
                NamePositionScene = escenesPost.NamePositionScene,
                NameScene = escenesPost.NameScene,
                ImageScene = escenesPost.ImageScene,
                UniversityId = idUniversity
            };
            await _context.Escenes.AddAsync(esceneSend);
            await _context.SaveChangesAsync();
            return StatusCode(200, new { message = "Escena Agregada Con Exito", esceneId = esceneSend.IdEscene });
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al agregar una nueva escena:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("{id}")]
    public async Task<ActionResult> PutEscenes([FromBody][Bind("NamePositionScene,NameScene,ImageScene")] EscenePostDTO escenePut, int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (id != escenePut.IdEscene)
        {
            return StatusCode(400, "El id de la escena no corresponde al id proporcionado");
        }
        try
        {
            bool response = await _context.Escenes.AnyAsync(u => u.IdEscene == id);
            if (!response)
            {
                return StatusCode(400, "La escena a modificar no existe");
            }
            Escene escene = await _context.Escenes.FirstAsync(u => u.IdEscene == id);
            escene.NamePositionScene = escenePut.NamePositionScene;
            escene.NameScene = escenePut.NameScene;
            escene.ImageScene = escenePut.ImageScene;
            _context.Escenes.Update(escene);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Escena Modificada Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al modificar la escena:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("Buttons/{id}")]
    public async Task<ActionResult> PutButtonsEscenes([FromBody] EsceneButtonsDTO buttonsDTO, int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.Escenes.AnyAsync(u => u.IdEscene == id);
            if (!response)
            {
                return StatusCode(400, "La escena a la que se le agregaran los botones no existe");
            }
            Escene escenePutButtons = await _context.Escenes.FirstAsync(u => u.IdEscene == id);
            bool responseRedirect = await _context.ButtonRedirects.AnyAsync(u => u.IdButtonRedirect == buttonsDTO.ButtonRedirectId);
            bool responseInformation = await _context.ButtonInformations.AnyAsync(u => u.IdButtonInformation == buttonsDTO.ButtonInformationId);
            if (!responseInformation && !responseRedirect)
            {
                return StatusCode(400, "No hay ningun boton valido para añadir a la escena");
            }
            if (responseInformation)
            {
                ButtonInformation buttonInformation = await _context.ButtonInformations.FirstAsync(u => u.IdButtonInformation == buttonsDTO.ButtonInformationId);
                escenePutButtons.ListButtonInfo.Add(buttonInformation);
            }
            if (responseRedirect)
            {
                ButtonRedirect buttonRedirect = await _context.ButtonRedirects.FirstAsync(u => u.IdButtonRedirect == buttonsDTO.ButtonRedirectId);
                escenePutButtons.ListButtonRed.Add(buttonRedirect);
            }
            _context.Escenes.Update(escenePutButtons);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Botones Agregados Con Exito A La Escena");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al añadir los botones de la escena:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEscenes(int id)
    {
        try
        {
            bool response = await _context.Escenes.AnyAsync(u => u.IdEscene == id);
            if (!response)
            {
                return StatusCode(400, "La escena a eliminar no existe");
            }
            Escene escene = await _context.Escenes.FirstAsync(u => u.IdEscene == id);
            _context.Escenes.Remove(escene);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Escena Eliminada Con Exito");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al eliminar la escena:{ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado:{ex.Message}");
        }
    }
}
