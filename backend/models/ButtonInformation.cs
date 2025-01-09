using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.models;
public class ButtonInformation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdButtonInformation { get; set; }
    [Required]
    [Range(0.250, 2.500, ErrorMessage = "El largo dado no es uno establecido dentro del rango (de 0.250 hasta 2.500)")]
    [Precision(4, 3)]
    public required decimal ButtonLarge { get; set; }
    [Required]
    [Range(-2.500, 2.500, ErrorMessage = "El alto dado no es uno establecido dentro del rango (de -2.500 hasta 2.500)")]
    [Precision(4, 3)]
    public required decimal ButtonHigh { get; set; }
    [Required]
    [Range(-1.500, 1.500, ErrorMessage = "El ancho dado no es uno establecido dentro del rango (de -1.500 hasta 1.500)")]
    [Precision(4, 3)]
    public required decimal ButtonWidth { get; set; }
    [Required]
    [Range(-15.000, 15.000, ErrorMessage = "La posicion en eje X dado no es uno establecido dentro del rango (de -15.000 hasta 15.000)")]
    [Precision(5, 3)]
    public required decimal PositionX { get; set; }
    [Required]
    [Range(-5.000, 0.800, ErrorMessage = "La posicion en eje Y dado no es uno establecido dentro del rango (de -5.000 hasta 0.800)")]
    [Precision(4, 3)]
    public required decimal PositionY { get; set; }
    [Required]
    [Range(-15.000, 15.000, ErrorMessage = "La posicion en eje Z dado no es uno establecido dentro del rango (de -15.000 hasta 15.000)")]
    [Precision(5, 3)]
    public required decimal PositionZ { get; set; }
    [Required]
    [Range(-360.000, 360.000, ErrorMessage = "La rotacion en eje X dado no es uno establecido dentro del rango (de -360.000 hasta 360.000)")]
    [Precision(6, 3)]
    public required decimal RotationSideX { get; set; }
    [Required]
    [Range(-360.000, 360.000, ErrorMessage = "La rotacion en eje Y dado no es uno establecido dentro del rango (de -360.000 hasta 360.000)")]
    [Precision(6, 3)]
    public required decimal RotationSideY { get; set; }
    [Required]
    [Range(-360.000, 360.000, ErrorMessage = "La rotacion en eje Z dado no es uno establecido dentro del rango (de -360.000 hasta 360.000)")]
    [Precision(6, 3)]
    public required decimal RotationSideZ { get; set; }
    [Url(ErrorMessage = "La url proporcionada no es una valida, asegurese que coincida con una correcta")]
    public string? OptionalImage { get; set; }
    [StringLength(500, MinimumLength = 4, ErrorMessage = "La longitud del texto no es valido , asegurese que se encuentre en el rango entre 4 y 500 letras")]
    public string? TextInformation { get; set; }
}