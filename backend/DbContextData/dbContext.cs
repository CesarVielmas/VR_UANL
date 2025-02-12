using Microsoft.EntityFrameworkCore;
using backend.models;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.DbContextData
{
    public class dbContext : DbContext
    {
        public DbSet<Escene> Escenes { get; set; }
        public DbSet<AuthUser> AuthUsers { get; set; }
        public DbSet<ButtonInformation> ButtonInformations { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<ButtonRedirect> ButtonRedirects { get; set; }

        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {

        }
        public dbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Environment.GetEnvironmentVariable("ConnectionString__MySQLConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException($"La cadena de conexión con mysql no está configurada correctamente.\n{connectionString}");
            }
            optionsBuilder.UseMySQL(connectionString);
            optionsBuilder.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Escene>()
                .HasOne<University>()
                .WithMany(u => u.ListEscenes)
                .HasForeignKey(e => e.UniversityId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Escene>()
                .HasIndex(e => e.NamePositionScene)
                .IsUnique();

            modelBuilder.Entity<University>()
                .HasIndex(u => u.NameFaculty)
                .IsUnique();

            modelBuilder.Entity<University>()
                .HasIndex(u => u.NameCompleteFaculty)
                .IsUnique();

            modelBuilder.Entity<AuthUser>()
                .HasMany(au => au.ListUniversitys)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ButtonInformation>()
                .Property(b => b.IdButtonInformation)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ButtonInformation>()
                .HasOne<Escene>()
                .WithMany(e => e.ListButtonInfo)
                .HasForeignKey(bi => bi.EsceneId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ButtonRedirect>()
                .Property(b => b.IdButtonRedirect)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ButtonRedirect>()
                .HasOne<Escene>()
                .WithMany(e => e.ListButtonRed)
                .HasForeignKey(br => br.EsceneId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ButtonRedirect>()
                .HasOne<Escene>()
                .WithMany()
                .HasForeignKey(br => br.TargetEsceneId);
        }
    }
}
