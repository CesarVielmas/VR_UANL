using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly string _imagePath;
    public ImagesController()
    {
        _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
        if (!Directory.Exists(_imagePath))
        {
            Directory.CreateDirectory(_imagePath);
        }
    }

    [AllowAnonymous]
    [HttpGet("list/{FacultyName}")]
    public IActionResult ListImages(string FacultyName)
    {
        if (string.IsNullOrEmpty(FacultyName))
            return BadRequest("No se ha mandado el nombre de la facultad");
        var facultyPath = Path.Combine(_imagePath, FacultyName);
        if (!Directory.Exists(facultyPath))
        {
            return BadRequest("La facultad a la que se le intenta obtener las imagenes no existe");
        }
        var baseUrl = $"https://images-server-production.up.railway.app/images/{FacultyName}/";
        var files = Directory.GetFiles(facultyPath)
                    .Select(file => baseUrl + Path.GetFileName(file))
                    .ToList();
        return StatusCode(200, new { Message = "Archivos obtenidos con exito", Paths = files });
    }
    [Authorize(Roles = "Administrador")]
    [HttpPost("upload/{FacultyName}")]
    public IActionResult UploadImage([FromForm] IFormFile[] files, string FacultyName)
    {
        string[] permittedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        string[] permittedExtensionsFirstImage = { "LogoFaculty.png" };
        string[] permittedExtensionsSecondImage = { "ImageFaculty.jpg", "ImageFaculty.jpeg", "ImageFaculty.webp" };
        List<string> filesPaths = new List<string>();
        if (files == null || files.Length == 0)
            return BadRequest("No hay ningun archivo mandado");
        if (string.IsNullOrEmpty(FacultyName))
            return BadRequest("No se ha mandado el nombre de la facultad");
        if (files.Length > 2)
            return BadRequest("solo se pueden subir 2 imagenes como maximo");
        if (!permittedExtensionsFirstImage.Contains(files[0].FileName))
            return BadRequest(new { Message = $"Asegurese que el primer archivo coincida con alguno de los formatos establecidos", formats = permittedExtensionsFirstImage });
        if (files.Length > 1)
            if (!permittedExtensionsSecondImage.Contains(files[1].FileName))
                return BadRequest(new { Message = $"Asegurese que el segundo archivo coincida con alguno de los formatos establecidos", formats = permittedExtensionsSecondImage });

        var facultyPath = Path.Combine(_imagePath, FacultyName);
        if (!Directory.Exists(facultyPath))
        {
            Directory.CreateDirectory(facultyPath);
        }
        foreach (var file in files)
        {
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
            {
                return BadRequest($"El archivo {file.FileName} no es una imagen válida, asegurese de enviar imagenes validas");
            }
            var filePath = Path.Combine(facultyPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            filesPaths.Add($"https://images-server-production.up.railway.app/images/{FacultyName}/{file.FileName}");
        }
        return StatusCode(200, new { Message = "Los archivos se subieron con exito", paths = filesPaths });
    }
    [Authorize(Roles = "Administrador")]
    [HttpPost("upload/Escene/{FacultyName}")]
    public IActionResult UploadEscene([FromForm] IFormFile file, string FacultyName)
    {
        string[] permittedExtensions = { ".jpg", ".jpeg", ".webp" };

        if (file == null)
            return BadRequest("No se envió ningún archivo");

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!permittedExtensions.Contains(ext))
            return BadRequest($"Extensión {ext} no permitida");

        var baseName = Path.GetFileNameWithoutExtension(file.FileName);
        var escenePath = Path.Combine(_imagePath, FacultyName, "Escenes");
        Directory.CreateDirectory(escenePath);

        // Eliminar todas las versiones previas
        foreach (var allowedExt in permittedExtensions)
        {
            var oldFile = Path.Combine(escenePath, $"{baseName}{allowedExt}");
            if (System.IO.File.Exists(oldFile)) System.IO.File.Delete(oldFile);
        }

        var fileName = $"{baseName}{ext}";
        var filePath = Path.Combine(escenePath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }

        return Ok(new
        {
            Message = "Escena subida exitosamente",
            Path = $"{Request.Scheme}s://{Request.Host}/images/{FacultyName}/Escenes/{fileName}"
        });
    }
    [Authorize(Roles = "Administrador")]
    [HttpPost("upload/buttonInformation/{FacultyName}")]
    public IActionResult UploadButtonInformation([FromForm] IFormFile file, string FacultyName)
    {
        string[] permittedExtensions = { ".jpg", ".jpeg", ".webp" };

        if (file == null)
            return BadRequest("No se envió ningún archivo");

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!permittedExtensions.Contains(ext))
            return BadRequest($"Extensión {ext} no permitida");

        var baseName = Path.GetFileNameWithoutExtension(file.FileName);
        var infoPath = Path.Combine(_imagePath, FacultyName, "Escenes", "InformationImages");
        Directory.CreateDirectory(infoPath);

        // Eliminar versiones anteriores
        foreach (var allowedExt in permittedExtensions)
        {
            var oldFile = Path.Combine(infoPath, $"{baseName}{allowedExt}");
            if (System.IO.File.Exists(oldFile)) System.IO.File.Delete(oldFile);
        }

        var fileName = $"{baseName}{ext}";
        var filePath = Path.Combine(infoPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }

        return Ok(new
        {
            Message = "Imagen de información subida exitosamente",
            Path = $"{Request.Scheme}s://{Request.Host}/images/{FacultyName}/Escenes/InformationImages/{fileName}"
        });
    }
    [Authorize(Roles = "Administrador")]
    [HttpDelete("delete/{FacultyName}")]
    public IActionResult DeleteImages(string FacultyName)
    {
        if (string.IsNullOrEmpty(FacultyName))
            return BadRequest("No se ha mandado el nombre de la facultad");
        var facultyPath = Path.Combine(_imagePath, FacultyName);
        if (!Directory.Exists(facultyPath))
        {
            return BadRequest("La facultad a la que se le intenta eliminar las imagenes no existe");
        }
        Directory.Delete(facultyPath, true);
        return StatusCode(200, new { Message = "La carpeta y todos los archivos se eliminaron con exito" });
    }
}
