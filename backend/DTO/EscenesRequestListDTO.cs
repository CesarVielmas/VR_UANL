using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.models;
public class EscenesRequestListDTO
{
    public List<Escene> ListEscenes { get; set; } = new List<Escene>();
}