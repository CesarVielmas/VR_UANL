using backend.DbContextData;
using backend.models;
using Microsoft.EntityFrameworkCore;

public static class DbSeed
{
    public static async Task InitializeAsync(dbContext context)
    {
        await context.Database.MigrateAsync();
        var requiredUniversityNames = new[] { "Ejemplo_1", "Ejemplo_2" };
        var requiredUniversities = new List<University>
        {
            new University
            {
                IdUniversity = 1,
                NameFaculty = "Ejemplo_1",
                NameCompleteFaculty = "Esto es un ejemplo 1",
                ImageFaculty = "https://www.fime.uanl.mx/wp-content/uploads/2023/05/IMG_5415-scaled.jpg",
                ListEscenes = new List<Escene>(),
                LogoFaculty = "https://w7.pngwing.com/pngs/826/982/png-transparent-chicago-bears-nfl-wall-decal-chicago-bears-mammal-face-cat-like-mammal.png"
            },
            new University
            {
                IdUniversity = 2,
                NameFaculty = "Ejemplo_2",
                NameCompleteFaculty = "Esto es un ejemplo 2",
                ImageFaculty = "https://filosofia.uanl.mx/wp-content/uploads/2023/11/fachada-filo-egrsdos.jpg",
                ListEscenes = new List<Escene>(),
                LogoFaculty = "https://filosofia.uanl.mx/wp-content/uploads/2023/11/FFyLescudo.png"
            }
        };
        foreach (var university in requiredUniversities)
        {
            var exists = await context.Universities
                .AnyAsync(u => u.NameFaculty == university.NameFaculty);

            if (!exists)
            {
                await context.Universities.AddAsync(university);
            }
        }
        await context.SaveChangesAsync();
        var defaultUsername = "CesarVielmas";
        var existingUser = await context.AuthUsers
            .Include(u => u.ListUniversitys)
            .FirstOrDefaultAsync(u => u.UserName == defaultUsername);

        var baseUniversities = await context.Universities
            .Where(u => requiredUniversityNames.Contains(u.NameFaculty))
            .ToListAsync();

        if (existingUser == null)
        {
            var newUser = new AuthUser
            {
                UserName = defaultUsername,
                UserPassword = BCrypt.Net.BCrypt.HashPassword("8h@G7$Qw3rY1Z!pK"),
                UserLevel = 4,
                UserConectionDate = DateTime.Now,
                ListUniversitys = baseUniversities
            };

            await context.AuthUsers.AddAsync(newUser);
        }
        else
        {
            foreach (var uni in baseUniversities)
            {
                if (!existingUser.ListUniversitys.Any(u => u.IdUniversity == uni.IdUniversity))
                {
                    existingUser.ListUniversitys.Add(uni);
                }
            }
        }

        await context.SaveChangesAsync();
    }
}