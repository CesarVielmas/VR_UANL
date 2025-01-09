using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.models;
public class University
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdUniversity { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 1, ErrorMessage = "La longitud del texto proporcionado no es valido , asegurese que se encuentre entre el rango de 1 hasta 30 letras")]
    public required string NameFaculty { get; set; }

    [Required]
    [StringLength(500, MinimumLength = 4, ErrorMessage = "La longitud del texto proporcionado no es valido , asegurese que se encuentre entre el rango de 4 hasta 500 letras")]
    [RegularExpression(@"^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]+$", ErrorMessage = "El nombre de la facultad no es un nombre valido, asegurese que no incluya caracteres especiales")]
    public required string NameCompleteFaculty { get; set; }

    [Required]
    [Url(ErrorMessage = "La url proporcionada no es una url valida , asegurese de proporcionarla correctamente")]
    public required string LogoFaculty { get; set; }

    [Required]
    [Url(ErrorMessage = "La url proporcionada no es una url valida , asegurese de proporcionarla correctamente")]
    public required string ImageFaculty { get; set; }

    public List<Escene> ListEscenes { get; set; } = new List<Escene>();
}
