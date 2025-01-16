using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.models;
using BCrypt.Net;
using backend.DbContextData;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using backend.DTO;
using Microsoft.Extensions.Options;

[Route("api/[controller]")]
[ApiController]
public class AuthUserController : ControllerBase
{
    private readonly dbContext _context;
    private readonly JwtSettings _jwtSettings;

    public AuthUserController(dbContext context, IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
        _context = context;
    }
    [AllowAnonymous]
    [HttpPost("VerifyUser")]
    public async Task<ActionResult> CheckAuthUser([FromBody][Bind("UserName,UserPassword")] AuthUserVerifyDTO user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool response = await _context.AuthUsers.AnyAsync(u => u.UserName == user.UserName);
            if (!response)
            {
                return StatusCode(400, "Usuario Invalido");
            }
            var responseUser = await _context.AuthUsers.FirstAsync(u => u.UserName == user.UserName);
            string password = responseUser.UserPassword;
            if (!ComprobateUser(user.UserPassword, password))
            {
                return StatusCode(400, "La contraseña del usuario no es valida");
            }
            string token = GenerateJwtToken(responseUser);
            return StatusCode(200, new { token, id = responseUser.IdAuthUser });
        }
        catch (System.Exception ex)
        {
            return StatusCode(400, $"Hubo un error inesperado: {ex.Message}");
        }
    }
    //http://localhost:5028/api/AuthUser?namesUniversitys=Universidad1&namesUniversitys=Universidad2&namesUniversitys=Universidad3
    //[Authorize(Roles = "Administrador")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> PostAuthUser([FromBody][Bind("UserName,UserPassword,UserLevel")] AuthUserPostDTO user, [FromQuery] string[] namesUniversitys)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            bool responseExist = await _context.AuthUsers.AnyAsync(u => u.UserName == user.UserName);
            if (responseExist)
            {
                return StatusCode(400, "El usuario ya estaba registrado dentro del sistema");
            }
            AuthUser userPost = new AuthUser
            {
                UserName = user.UserName,
                UserPassword = EncryptUser(user.UserPassword),
                UserLevel = user.UserLevel,
                UserConectionDate = DateTime.Now,
                ListUniversitys = new List<University>()
            };
            if (namesUniversitys.Length > 0 && namesUniversitys != null)
            {
                var universitys = await _context.Universities.Where(u => namesUniversitys.Contains(u.NameFaculty)).ToListAsync();
                userPost.ListUniversitys.AddRange(universitys);
            }
            await _context.AuthUsers.AddAsync(userPost);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Usuario añadido con exito");
        }
        catch (System.Exception ex)
        {
            return StatusCode(400, $"Hubo un error inesperado : {ex.Message}");
        }
    }
    [Authorize(Roles = "Administrador")]
    [HttpGet("{id}")]
    public async Task<ActionResult<AuthUser>> GetPanelControl(int id)
    {
        bool responseId = await _context.AuthUsers.AnyAsync(u => u.IdAuthUser == id);
        if (!responseId)
        {
            return StatusCode(400, "El usuario perteneciente al id no coincide con ninguno");
        }
        var userNameClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
        if (userNameClaim == null)
        {
            return Unauthorized("No se pudo determinar el nombre de usuario en el token");
        }
        bool response = await _context.AuthUsers.AnyAsync(u => u.UserName == userNameClaim.Value);
        if (!response)
        {
            return StatusCode(400, "El usuario perteneciente al token ya no existe");
        }
        AuthUser userSend = await _context.AuthUsers.FirstAsync(u => u.IdAuthUser == id);
        if (userSend.UserName != userNameClaim.Value)
        {
            return Unauthorized("El id del usuario al que se intento obtener la informacion , no es valido para este nivel de seguridad");
        }
        userSend.UserConectionDate = DateTime.Now;
        userSend.ListUniversitys = await _context.AuthUsers
            .Where(u => u.IdAuthUser == userSend.IdAuthUser)
            .Include(u => u.ListUniversitys)
                .ThenInclude(university => university.ListEscenes)
                .ThenInclude(escene => escene.ListButtonRed)
                .ThenInclude(buttonRedirect => buttonRedirect.PageToSender)
            .Include(u => u.ListUniversitys)
                .ThenInclude(university => university.ListEscenes)
                .ThenInclude(escene => escene.ListButtonInfo)
            .Select(u => u.ListUniversitys)
            .AsSplitQuery()
            .FirstOrDefaultAsync() ?? new List<University>();
        _context.AuthUsers.Update(userSend);
        await _context.SaveChangesAsync();
        return StatusCode(200, new { userSend.UserName, userSend.UserLevel, userSend.UserConectionDate, userSend.ListUniversitys });

    }
    [Authorize(Roles = "Administrador")]
    [HttpPut("AddUniversitys/{id}")]
    public async Task<ActionResult<AuthUser>> PutUniversitysUser(int id, [FromQuery] string[] namesUniversitys)
    {
        if (namesUniversitys == null || namesUniversitys.Length == 0)
        {
            return StatusCode(400, "No se han enviado universidades para agregar al usuario");
        }

        var universitys = await _context.Universities.Where(u => namesUniversitys.Contains(u.NameFaculty)).ToListAsync();
        if (universitys.Count != namesUniversitys.Length)
        {
            return StatusCode(400, "Algunas universidades no existen en la base de datos");
        }
        foreach (var university in universitys)
        {
            bool responseUniversity = _context.AuthUsers.Any(u => u.ListUniversitys.Any(u => u.NameFaculty == university.NameFaculty));
            if (responseUniversity)
            {
                return StatusCode(400, "Algunas universidades ya estan agregadas a un usuario");
            }
        }

        var userNameClaim = User.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name);
        if (userNameClaim == null)
        {
            return Unauthorized("No se pudo determinar el nombre de usuario en el token");
        }

        bool response = await _context.AuthUsers.AnyAsync(u => u.UserName == userNameClaim.Value);
        if (!response)
        {
            return StatusCode(400, "El usuario perteneciente al token ya no existe");
        }

        bool responseIdUser = await _context.AuthUsers.AnyAsync(u => u.IdAuthUser == id);
        if (!responseIdUser)
        {
            return StatusCode(400, "El usuario perteneciente al id no coincide con ninguno");
        }

        AuthUser userSend = await _context.AuthUsers.FirstAsync(u => u.IdAuthUser == id);
        if (userSend.ListUniversitys == null)
        {
            userSend.ListUniversitys = new List<University>();
        }
        List<University> universitysSend = await _context.Universities.Where(u => namesUniversitys.Contains(u.NameFaculty)).ToListAsync();
        userSend.ListUniversitys.AddRange(universitysSend);
        _context.AuthUsers.Update(userSend);
        await _context.SaveChangesAsync();
        return StatusCode(200, new { Message = "Universidades añadidas con exito al usuario" });
    }
    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuthUser(int id)
    {
        bool responseId = await _context.AuthUsers.AnyAsync(u => u.IdAuthUser == id);
        if (!responseId)
        {
            return StatusCode(400, "El usuario perteneciente al id no coincide con ninguno");
        }
        var userNameClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
        if (userNameClaim == null)
        {
            return Unauthorized("No se pudo determinar el nombre de usuario en el token");
        }
        bool response = await _context.AuthUsers.AnyAsync(u => u.UserName == userNameClaim.Value);
        if (!response)
        {
            return StatusCode(400, "El usuario perteneciente al token ya no existe");
        }
        AuthUser userSend = await _context.AuthUsers.FirstAsync(u => u.IdAuthUser == id);
        _context.AuthUsers.Remove(userSend);
        await _context.SaveChangesAsync();
        return StatusCode(200, "Usuario eliminado con exito");
    }
    private string EncryptUser(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
    private bool ComprobateUser(string passwordCheck, string userPassword)
    {
        return BCrypt.Net.BCrypt.Verify(passwordCheck, userPassword);
    }
    private string GenerateJwtToken(AuthUser user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, "Administrador")
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
                issuer: "Backend",
                audience: "VRFronted",
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
