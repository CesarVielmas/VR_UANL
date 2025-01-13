using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.DTO;
public class AuthUserVerifyDTO
{
    [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "El nombre de usuario debe tener entre 6 y 100 letras")]
    [RegularExpression(@"^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:[\s-][A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$", ErrorMessage = "El nombre solo puede contener letras, espacios y guiones")]
    public required string UserName { get; set; }
    [Required(ErrorMessage = "La contraseña es obligatoria")]
    [StringLength(100, MinimumLength = 16, ErrorMessage = "La contraseña debe tener entre 16 y 100 caracteres")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?{}|<>])[A-Za-z\d!@#$%^&*(),.?{}|<>]+$", ErrorMessage = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")]
    public required string UserPassword { get; set; }
}