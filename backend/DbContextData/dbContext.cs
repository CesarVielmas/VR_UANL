using Microsoft.EntityFrameworkCore;
using backend.models;

namespace backend.DbContextData
{
    public class dbContext : DbContext
    {
        public DbSet<Escene> Escenes { get; set; }
        public DbSet<AuthUser> AuthUsers { get; set; }
        public DbSet<ButtonInformation> ButtonInformations { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<ButtonRedirect> ButtonRedirects { get; set; }

        public dbContext(DbContextOptions<dbContext> options) : base(options) { }
        public dbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("Server=localhost;Database=vr_uanl;User=root;Password=vielmas@salais;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Escene>()
                .HasOne(e => e.University)
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
                .HasOne<Escene>()
                .WithMany(e => e.ListButtonInfo)
                .HasForeignKey(bi => bi.IdButtonInformation)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ButtonRedirect>()
                .HasOne<Escene>()
                .WithMany(e => e.ListButtonRed)
                .HasForeignKey(br => br.IdButtonRedirect)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
