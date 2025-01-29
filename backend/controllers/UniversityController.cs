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
    [HttpPut("Escenes/{id}")]
    public async Task<ActionResult> PutUniversityScenes(int id, [FromBody] EscenesRequestListDTO listEscenes)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var university = await _context.Universities
                .Include(u => u.ListEscenes)
                .FirstOrDefaultAsync(u => u.IdUniversity == id);

            if (university == null)
            {
                return BadRequest("La universidad no existe.");
            }

            var existingScenes = await _context.Escenes
                .Where(e => e.UniversityId == id)
                .Include(e => e.ListButtonRed)
                .Include(e => e.ListButtonInfo)
                .AsSplitQuery()
                .ToListAsync();

            var sceneMap = existingScenes.ToDictionary(e => e.IdEscene);
            var targetEsceneMap = listEscenes.ListEscenes
                .SelectMany(e => e.ListButtonRed)
                .Where(b => b.TargetEsceneId.HasValue && b.TargetEsceneId.Value != 0)
                .ToDictionary(b => b.TargetEsceneId.Value, b => b.EsceneId);

            var updatedScenes = new List<Escene>();

            foreach (var sceneDto in listEscenes.ListEscenes)
            {
                if (sceneMap.TryGetValue(sceneDto.IdEscene, out var existingScene))
                {
                    existingScene.ImageScene = sceneDto.ImageScene;
                    existingScene.NameScene = sceneDto.NameScene;
                    _context.Escenes.Update(existingScene);
                }
                else
                {
                    existingScene = new Escene
                    {
                        ImageScene = sceneDto.ImageScene,
                        NamePositionScene = sceneDto.NamePositionScene,
                        NameScene = sceneDto.NameScene,
                        UniversityId = id
                    };
                    _context.Escenes.Add(existingScene);
                }
                updatedScenes.Add(existingScene);
            }

            // Eliminar escenas que ya no están en la lista
            var scenesToDelete = existingScenes.Where(e => !listEscenes.ListEscenes.Any(dto => dto.IdEscene == e.IdEscene)).ToList();
            _context.Escenes.RemoveRange(scenesToDelete);

            await _context.SaveChangesAsync();

            foreach (var scene in updatedScenes)
            {
                var sceneDto = listEscenes.ListEscenes.FirstOrDefault(e => e.NamePositionScene == scene.NamePositionScene);
                UpdateButtons(scene, sceneDto, targetEsceneMap.ToDictionary(kvp => kvp.Key, kvp => kvp.Value.Value));
            }

            // Eliminar botones que ya no están en la lista
            foreach (var scene in existingScenes)
            {
                var sceneDto = listEscenes.ListEscenes.FirstOrDefault(dto => dto.IdEscene == scene.IdEscene);
                if (sceneDto != null)
                {
                    var buttonsToDelete = scene.ListButtonRed.Where(b => !sceneDto.ListButtonRed.Any(dto => dto.IdButtonRedirect == b.IdButtonRedirect)).ToList();
                    var infoButtonsToDelete = scene.ListButtonInfo.Where(b => !sceneDto.ListButtonInfo.Any(dto => dto.IdButtonInformation == b.IdButtonInformation)).ToList();

                    _context.ButtonRedirects.RemoveRange(buttonsToDelete);
                    _context.ButtonInformations.RemoveRange(infoButtonsToDelete);
                }
            }

            await _context.SaveChangesAsync();

            return Ok("Universidad y escenas actualizadas con éxito.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error inesperado: {ex.Message}");
        }
    }

    private void UpdateButtons(Escene scene, Escene sceneDto, Dictionary<int, int> targetEsceneMap)
    {
        var existingRedButtons = scene.ListButtonRed.ToDictionary(b => b.IdButtonRedirect);
        var existingInfoButtons = scene.ListButtonInfo.ToDictionary(b => b.IdButtonInformation);

        foreach (var buttonDto in sceneDto.ListButtonRed)
        {
            if (existingRedButtons.TryGetValue(buttonDto.IdButtonRedirect, out var existingButton))
            {
                UpdateButtonProperties(existingButton, buttonDto, targetEsceneMap);
                _context.ButtonRedirects.Update(existingButton);
            }
            else
            {
                var newButton = CreateButton(buttonDto, scene.IdEscene, targetEsceneMap);
                _context.ButtonRedirects.Add(newButton);
            }
        }

        foreach (var buttonDto in sceneDto.ListButtonInfo)
        {
            if (existingInfoButtons.TryGetValue(buttonDto.IdButtonInformation, out var existingButton))
            {
                UpdateInfoButtonProperties(existingButton, buttonDto);
                _context.ButtonInformations.Update(existingButton);
            }
            else
            {
                var newButton = CreateInfoButton(buttonDto, scene.IdEscene);
                _context.ButtonInformations.Add(newButton);
            }
        }
    }

    private void UpdateButtonProperties(ButtonRedirect button, ButtonRedirect dto, Dictionary<int, int> targetEsceneMap)
    {
        button.ButtonHigh = dto.ButtonHigh;
        button.ButtonLarge = dto.ButtonLarge;
        button.ButtonWidth = dto.ButtonWidth;
        button.PositionX = dto.PositionX;
        button.PositionY = dto.PositionY;
        button.PositionZ = dto.PositionZ;
        button.RotationSideX = dto.RotationSideX;
        button.RotationSideY = dto.RotationSideY;
        button.RotationSideZ = dto.RotationSideZ;
        button.HorientationButton = dto.HorientationButton;

        if (targetEsceneMap.TryGetValue((int)dto.TargetEsceneId, out var targetId))
        {
            button.PageToSender = _context.Escenes.Find(targetId);
        }
    }

    private ButtonRedirect CreateButton(ButtonRedirect dto, int sceneId, Dictionary<int, int> targetEsceneMap)
    {
        return new ButtonRedirect
        {
            ButtonHigh = dto.ButtonHigh,
            ButtonLarge = dto.ButtonLarge,
            ButtonWidth = dto.ButtonWidth,
            PositionX = dto.PositionX,
            PositionY = dto.PositionY,
            PositionZ = dto.PositionZ,
            RotationSideX = dto.RotationSideX,
            RotationSideY = dto.RotationSideY,
            RotationSideZ = dto.RotationSideZ,
            HorientationButton = dto.HorientationButton,
            EsceneId = sceneId,
            PageToSender = targetEsceneMap.TryGetValue((int)dto.TargetEsceneId, out var targetId) ? _context.Escenes.Find(targetId) : null
        };
    }

    private void UpdateInfoButtonProperties(ButtonInformation button, ButtonInformation dto)
    {
        button.ButtonHigh = dto.ButtonHigh;
        button.ButtonLarge = dto.ButtonLarge;
        button.ButtonWidth = dto.ButtonWidth;
        button.PositionX = dto.PositionX;
        button.PositionY = dto.PositionY;
        button.PositionZ = dto.PositionZ;
        button.RotationSideX = dto.RotationSideX;
        button.RotationSideY = dto.RotationSideY;
        button.RotationSideZ = dto.RotationSideZ;
        button.TextInformation = dto.TextInformation;
        button.OptionalImage = dto.OptionalImage;
    }

    private ButtonInformation CreateInfoButton(ButtonInformation dto, int sceneId)
    {
        return new ButtonInformation
        {
            ButtonHigh = dto.ButtonHigh,
            ButtonLarge = dto.ButtonLarge,
            ButtonWidth = dto.ButtonWidth,
            PositionX = dto.PositionX,
            PositionY = dto.PositionY,
            PositionZ = dto.PositionZ,
            RotationSideX = dto.RotationSideX,
            RotationSideY = dto.RotationSideY,
            RotationSideZ = dto.RotationSideZ,
            TextInformation = dto.TextInformation,
            OptionalImage = dto.OptionalImage,
            EsceneId = sceneId
        };
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
