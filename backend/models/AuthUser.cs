using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.models;
public class AuthUser
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdAuthUser { get; set; }
    [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "El nombre de usuario debe tener entre 6 y 100 letras")]
    [RegularExpression(@"^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:[\s-][A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$", ErrorMessage = "El nombre solo puede contener letras, espacios y guiones")]
    public required string UserName { get; set; }
    [Required(ErrorMessage = "La contraseña es obligatoria")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 100 caracteres")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?{}|<>])[A-Za-z\d!@#$%^&*(),.?{}|<>]+$", ErrorMessage = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")]
    public required string UserPassword { get; set; }
    [Required(ErrorMessage = "El nivel de usuario es obligatorio")]
    [Range(0, 4, ErrorMessage = "El nivel de usuario no esta dentro del rango, asegurese que este entre 0 y 4")]
    public required byte UserLevel { get; set; }
    [Required(ErrorMessage = "La fecha de conexion del usuario es obligatoria")]
    [DataType(DataType.Date, ErrorMessage = "La fecha de conexion debe ser valida")]
    public required DateTime UserConectionDate { get; set; }
    [Required]
    [MinLength(1, ErrorMessage = "El usuario debe de estar asignado minimamente a una universidad")]
    public required List<University> ListUniversitys { get; set; }
}

