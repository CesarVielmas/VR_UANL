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
    [HttpPut("Escenes/{id}")] public async Task<ActionResult> PutUniversityScenes(int id, [FromBody] EscenesRequestListDTO listEscenes) {
    if (!ModelState.IsValid) { 
        return BadRequest(ModelState); 
    }
    try
        {
            var university = await _context.Universities
                .Include(u => u.ListEscenes)
                .FirstOrDefaultAsync(u => u.IdUniversity == id);

            if (university == null)
            {
                return StatusCode(400, "La universidad no existe.");
            }
            //Delete Escenes
            University universitySelect = await _context.Universities.FirstAsync(u=> u.IdUniversity == id);
            List<ButtonRedirect> buttonsRedirects = await _context.Universities
                .Where(u => u.IdUniversity == id)
                .SelectMany(u => u.ListEscenes)         
                .SelectMany(e => e.ListButtonRed)       
                .Distinct()                          
                .ToListAsync();
            List<ButtonInformation> buttonsInformation = await _context.Universities
                .Where(u => u.IdUniversity == id)
                .SelectMany(u => u.ListEscenes)         
                .SelectMany(e => e.ListButtonInfo)       
                .Distinct()                          
                .ToListAsync();
            foreach (Escene existingScene in universitySelect.ListEscenes)
            {
                bool exists = listEscenes.ListEscenes.Any(s => 
                    s.NamePositionScene == existingScene.NamePositionScene);
                if(!exists){
                    Console.WriteLine("Elimino Escene");
                    _context.Escenes.Remove(existingScene);
                }
            }
            foreach (ButtonRedirect buttonsRed in buttonsRedirects)
            {
                bool existButtonRed = false;
                foreach (Escene item in listEscenes.ListEscenes)
                {
                    foreach (ButtonRedirect item2 in item.ListButtonRed)
                    {
                        if(item2.IdButtonRedirect == buttonsRed.IdButtonRedirect)
                            existButtonRed = true;
                    }
                }
                if(!existButtonRed){
                    _context.ButtonRedirects.Remove(buttonsRed);
                }
            }
            foreach (ButtonInformation buttonsInfo in buttonsInformation)
            {
                bool existButtonInfo = false;
                foreach (Escene item in listEscenes.ListEscenes)
                {
                    foreach (ButtonInformation item2 in item.ListButtonInfo)
                    {
                        if(item2.IdButtonInformation == buttonsInfo.IdButtonInformation)
                            existButtonInfo = true;
                    }
                }
                if(!existButtonInfo){
                    _context.ButtonInformations.Remove(buttonsInfo);
                }
            }
            await _context.SaveChangesAsync();
            var targetEsceneMap = new Dictionary<int, string>();
            foreach (var esceneDto in listEscenes.ListEscenes)
            {
                foreach (var buttonRed in esceneDto.ListButtonRed)
                {
                    if (buttonRed.TargetEsceneId != 0)
                    {
                        targetEsceneMap.Add((int)buttonRed.TargetEsceneId, esceneDto.NamePositionScene);
                    }
                }
            }
            var insertedEscenes = new List<Escene>();
            foreach (Escene sceneToPutOrPost in listEscenes.ListEscenes)
            {
                bool resultId = await _context.Escenes.AnyAsync(e => e.IdEscene == sceneToPutOrPost.IdEscene && e.NamePositionScene == sceneToPutOrPost.NamePositionScene);
                if (resultId)
                {
                    Escene sceneObtain = await _context.Escenes.FirstAsync(e => e.IdEscene == sceneToPutOrPost.IdEscene);
                    sceneObtain.ImageScene = sceneToPutOrPost.ImageScene;
                    sceneObtain.NameScene = sceneToPutOrPost.NameScene;
                    _context.Escenes.Update(sceneObtain);
                    insertedEscenes.Add(sceneObtain);
                }
                else
                {
                    bool resultNamePosition = await _context.Escenes.AnyAsync(e => e.NamePositionScene == sceneToPutOrPost.NamePositionScene);
                    if (resultNamePosition)
                    {
                        Escene sceneObtain = await _context.Escenes.FirstAsync(e => e.NamePositionScene == sceneToPutOrPost.NamePositionScene);
                        sceneObtain.ImageScene = sceneToPutOrPost.ImageScene;
                        sceneObtain.NameScene = sceneToPutOrPost.NameScene;
                        _context.Escenes.Update(sceneObtain);
                        insertedEscenes.Add(sceneObtain);
                    }
                    else
                    {
                        Escene sceneToPost = new Escene
                        {
                            ImageScene = sceneToPutOrPost.ImageScene,
                            NamePositionScene = sceneToPutOrPost.NamePositionScene,
                            NameScene = sceneToPutOrPost.NameScene,
                            UniversityId = id
                        };
                        _context.Escenes.Add(sceneToPost);
                    }
                }
            }
            await _context.SaveChangesAsync();
            foreach (Escene sceneToSearch in listEscenes.ListEscenes)
            {
                Escene sceneSearched = await _context.Escenes
                                            .FirstAsync(e => e.NamePositionScene == sceneToSearch.NamePositionScene);
                if (!insertedEscenes.Any(i => i.NamePositionScene == sceneSearched.NamePositionScene))
                {
                    insertedEscenes.Add(sceneSearched);
                }
            }
            foreach (Escene sceneToAddButtons in listEscenes.ListEscenes)
            {
                // Procesar botones de redirección
                if (sceneToAddButtons.ListButtonRed.Count != 0)
                {
                    foreach (ButtonRedirect buttonRed in sceneToAddButtons.ListButtonRed)
                    {
                        bool responseIdRed = await _context.ButtonRedirects.AnyAsync(b => b.IdButtonRedirect == buttonRed.IdButtonRedirect);

                        if (responseIdRed)
                        {
                            // Actualizar botón existente
                            ButtonRedirect buttonRedToPut = await _context.ButtonRedirects.FirstAsync(b => b.IdButtonRedirect == buttonRed.IdButtonRedirect);

                            buttonRedToPut.ButtonHigh = buttonRed.ButtonHigh;
                            buttonRedToPut.ButtonLarge = buttonRed.ButtonLarge;
                            buttonRedToPut.ButtonWidth = buttonRed.ButtonWidth;
                            buttonRedToPut.PositionX = buttonRed.PositionX;
                            buttonRedToPut.PositionY = buttonRed.PositionY;
                            buttonRedToPut.PositionZ = buttonRed.PositionZ;
                            buttonRedToPut.RotationSideX = buttonRed.RotationSideX;
                            buttonRedToPut.RotationSideY = buttonRed.RotationSideY;
                            buttonRedToPut.RotationSideZ = buttonRed.RotationSideZ;
                            buttonRedToPut.HorientationButton = buttonRed.HorientationButton;

                            if (await _context.Escenes.AnyAsync(e => e == buttonRed.PageToSender))
                            {
                                var pageToSender = buttonRed.PageToSender;
                                buttonRedToPut.PageToSender = pageToSender;
                            }
                            else if (targetEsceneMap.Any(t => t.Key == buttonRed.TargetEsceneId))
                            {
                                // Resolver la escena de destino a partir del mapa
                                var targetName = targetEsceneMap.First(t => t.Key == buttonRed.TargetEsceneId).Value;
                                var targetEscene = insertedEscenes.FirstOrDefault(i => i.NamePositionScene == targetName);

                                if (targetEscene != null)
                                {
                                    var pageToSender = await _context.Escenes.FirstAsync(e => e.IdEscene == targetEscene.IdEscene);
                                    buttonRedToPut.PageToSender = pageToSender;
                                }
                                else
                                {
                                    Console.WriteLine($"No se encontró targetEscene para TargetEsceneId={buttonRed.TargetEsceneId}");
                                }
                            }

                            _context.Entry(buttonRedToPut).State = EntityState.Modified;
                            Console.WriteLine($"Actualizó el ButtonRedirect {buttonRedToPut.IdButtonRedirect} con TargetEsceneId={buttonRedToPut.TargetEsceneId}");
                        }
                        else
                        {
                            // Crear un nuevo botón
                            int targetIdToSend = 0;

                            if (targetEsceneMap.Any(t => t.Key == buttonRed.TargetEsceneId))
                            {
                                var targetName = targetEsceneMap.First(t => t.Key == buttonRed.TargetEsceneId).Value;
                                var targetEscene = insertedEscenes.FirstOrDefault(i => i.NamePositionScene == targetName);
                                targetIdToSend = targetEscene?.IdEscene ?? 0;
                            }

                            if (targetIdToSend == 0)
                            {
                                // Crear botón sin escena de destino
                                ButtonRedirect buttonToPost = new ButtonRedirect
                                {
                                    ButtonHigh = buttonRed.ButtonHigh,
                                    ButtonLarge = buttonRed.ButtonLarge,
                                    ButtonWidth = buttonRed.ButtonWidth,
                                    PositionX = buttonRed.PositionX,
                                    PositionY = buttonRed.PositionY,
                                    PositionZ = buttonRed.PositionZ,
                                    RotationSideX = buttonRed.RotationSideX,
                                    RotationSideY = buttonRed.RotationSideY,
                                    RotationSideZ = buttonRed.RotationSideZ,
                                    HorientationButton = buttonRed.HorientationButton,
                                    EsceneId = insertedEscenes.First(i => i.NamePositionScene == targetEsceneMap.First(t => t.Key == buttonRed.EsceneId).Value).IdEscene
                                };

                                _context.ButtonRedirects.Add(buttonToPost);
                            }
                            else
                            {
                                // Crear botón con escena de destino
                                ButtonRedirect buttonToPost = new ButtonRedirect
                                {
                                    ButtonHigh = buttonRed.ButtonHigh,
                                    ButtonLarge = buttonRed.ButtonLarge,
                                    ButtonWidth = buttonRed.ButtonWidth,
                                    PositionX = buttonRed.PositionX,
                                    PositionY = buttonRed.PositionY,
                                    PositionZ = buttonRed.PositionZ,
                                    RotationSideX = buttonRed.RotationSideX,
                                    RotationSideY = buttonRed.RotationSideY,
                                    RotationSideZ = buttonRed.RotationSideZ,
                                    HorientationButton = buttonRed.HorientationButton,
                                    EsceneId = insertedEscenes.First(i => i.NamePositionScene == targetEsceneMap.First(t => t.Key == buttonRed.EsceneId).Value).IdEscene,
                                    PageToSender = await _context.Escenes.FirstAsync(e => e.IdEscene == targetIdToSend)
                                };
                                _context.ButtonRedirects.Add(buttonToPost);
                                Console.WriteLine($"Posteó el ButtonRedirect con TargetEsceneId={buttonToPost.TargetEsceneId}");
                            }
                        }
                    }
                }

                // Procesar botones de información
                if (sceneToAddButtons.ListButtonInfo.Count != 0)
                {
                    foreach (ButtonInformation buttonInfo in sceneToAddButtons.ListButtonInfo)
                    {
                        bool responseIdInfo = await _context.ButtonInformations.AnyAsync(b => b.IdButtonInformation == buttonInfo.IdButtonInformation);

                        if (responseIdInfo)
                        {
                            // Actualizar botón de información existente
                            ButtonInformation buttonInfoToPut = await _context.ButtonInformations.FirstAsync(b => b.IdButtonInformation == buttonInfo.IdButtonInformation);

                            buttonInfoToPut.ButtonHigh = buttonInfo.ButtonHigh;
                            buttonInfoToPut.ButtonLarge = buttonInfo.ButtonLarge;
                            buttonInfoToPut.ButtonWidth = buttonInfo.ButtonWidth;
                            buttonInfoToPut.PositionX = buttonInfo.PositionX;
                            buttonInfoToPut.PositionY = buttonInfo.PositionY;
                            buttonInfoToPut.PositionZ = buttonInfo.PositionZ;
                            buttonInfoToPut.RotationSideX = buttonInfo.RotationSideX;
                            buttonInfoToPut.RotationSideY = buttonInfo.RotationSideY;
                            buttonInfoToPut.RotationSideZ = buttonInfo.RotationSideZ;
                            buttonInfoToPut.TextInformation = buttonInfo.TextInformation;
                            buttonInfoToPut.OptionalImage = buttonInfo.OptionalImage;

                            _context.Entry(buttonInfoToPut).State = EntityState.Modified;
                        }
                        else
                        {
                            // Crear un nuevo botón de información
                            ButtonInformation buttonToPost = new ButtonInformation
                            {
                                ButtonHigh = buttonInfo.ButtonHigh,
                                ButtonLarge = buttonInfo.ButtonLarge,
                                ButtonWidth = buttonInfo.ButtonWidth,
                                PositionX = buttonInfo.PositionX,
                                PositionY = buttonInfo.PositionY,
                                PositionZ = buttonInfo.PositionZ,
                                RotationSideX = buttonInfo.RotationSideX,
                                RotationSideY = buttonInfo.RotationSideY,
                                RotationSideZ = buttonInfo.RotationSideZ,
                                TextInformation = buttonInfo.TextInformation,
                                OptionalImage = buttonInfo.OptionalImage,
                                EsceneId = insertedEscenes.First(i => i.NamePositionScene == targetEsceneMap.First(t => t.Key == buttonInfo.EsceneId).Value).IdEscene
                            };

                            _context.ButtonInformations.Add(buttonToPost);
                        }
                    }
                }
            }

            // Guardar cambios
            var changes = await _context.SaveChangesAsync();
            Console.WriteLine($"Cambios aplicados: {changes}");

            return StatusCode(200, "Universidad y escenas actualizadas con éxito.");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(400, $"Error al actualizar la universidad: {ex.Message}");
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Error inesperado: {ex.Message}");
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
