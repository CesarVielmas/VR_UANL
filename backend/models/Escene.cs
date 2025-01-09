using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.models;
public class Escene
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdEscene { get; set; }
    [Required]
    [StringLength(500, MinimumLength = 3, ErrorMessage = "La longitud del texto proporcionado no es valido , asegurese que se encuentre entre el rango de 3 hasta 500 letras")]
    public required string NamePositionScene { get; set; }
    [Required]
    [StringLength(500, MinimumLength = 3, ErrorMessage = "La longitud del texto proporcionado no es valido , asegurese que se encuentre entre el rango de 3 hasta 500 letras")]
    [RegularExpression(@"^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]+$", ErrorMessage = "El nombre de la escena no es un nombre valido, asegurese que no incluya caracteres especiales")]
    public required string NameScene { get; set; }
    [Required]
    [Url(ErrorMessage = "La url proporcionada no es una url valida , asegurese de proporcionarla correctamente")]
    public required string ImageScene { get; set; }
    [Required]
    public int UniversityId { get; set; }
    [ForeignKey(nameof(UniversityId))]
    public required University University { get; set; }
    public List<ButtonRedirect> ListButtonRed { get; set; } = new List<ButtonRedirect>();
    public List<ButtonInformation> ListButtonInfo { get; set; } = new List<ButtonInformation>();
}

