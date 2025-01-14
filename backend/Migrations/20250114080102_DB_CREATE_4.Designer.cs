﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.DbContextData;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(dbContext))]
    [Migration("20250114080102_DB_CREATE_4")]
    partial class DB_CREATE_4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.models.AuthUser", b =>
                {
                    b.Property<int>("IdAuthUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("UserConectionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<byte>("UserLevel")
                        .HasColumnType("tinyint unsigned");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("IdAuthUser");

                    b.ToTable("AuthUsers");
                });

            modelBuilder.Entity("backend.models.ButtonInformation", b =>
                {
                    b.Property<int>("IdButtonInformation")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("ButtonHigh")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("ButtonLarge")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("ButtonWidth")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<int?>("EsceneId")
                        .HasColumnType("int");

                    b.Property<string>("OptionalImage")
                        .HasColumnType("longtext");

                    b.Property<decimal>("PositionX")
                        .HasPrecision(5, 3)
                        .HasColumnType("decimal(5,3)");

                    b.Property<decimal>("PositionY")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("PositionZ")
                        .HasPrecision(5, 3)
                        .HasColumnType("decimal(5,3)");

                    b.Property<decimal>("RotationSideX")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<decimal>("RotationSideY")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<decimal>("RotationSideZ")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<string>("TextInformation")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.HasKey("IdButtonInformation");

                    b.HasIndex("EsceneId");

                    b.ToTable("ButtonInformations");
                });

            modelBuilder.Entity("backend.models.ButtonRedirect", b =>
                {
                    b.Property<int>("IdButtonRedirect")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("ButtonHigh")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("ButtonLarge")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("ButtonWidth")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<int?>("EsceneId")
                        .HasColumnType("int");

                    b.Property<string>("HorientationButton")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("PageToSenderIdEscene")
                        .HasColumnType("int");

                    b.Property<decimal>("PositionX")
                        .HasPrecision(5, 3)
                        .HasColumnType("decimal(5,3)");

                    b.Property<decimal>("PositionY")
                        .HasPrecision(4, 3)
                        .HasColumnType("decimal(4,3)");

                    b.Property<decimal>("PositionZ")
                        .HasPrecision(5, 3)
                        .HasColumnType("decimal(5,3)");

                    b.Property<decimal>("RotationSideX")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<decimal>("RotationSideY")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<decimal>("RotationSideZ")
                        .HasPrecision(6, 3)
                        .HasColumnType("decimal(6,3)");

                    b.Property<int?>("TargetEsceneId")
                        .HasColumnType("int");

                    b.HasKey("IdButtonRedirect");

                    b.HasIndex("EsceneId");

                    b.HasIndex("PageToSenderIdEscene");

                    b.HasIndex("TargetEsceneId");

                    b.ToTable("ButtonRedirects");
                });

            modelBuilder.Entity("backend.models.Escene", b =>
                {
                    b.Property<int>("IdEscene")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImageScene")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NamePositionScene")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("NameScene")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<int>("UniversityId")
                        .HasColumnType("int");

                    b.HasKey("IdEscene");

                    b.HasIndex("NamePositionScene")
                        .IsUnique();

                    b.HasIndex("UniversityId");

                    b.ToTable("Escenes");
                });

            modelBuilder.Entity("backend.models.University", b =>
                {
                    b.Property<int>("IdUniversity")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AuthUserIdAuthUser")
                        .HasColumnType("int");

                    b.Property<string>("ImageFaculty")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LogoFaculty")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NameCompleteFaculty")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("NameFaculty")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.HasKey("IdUniversity");

                    b.HasIndex("AuthUserIdAuthUser");

                    b.HasIndex("NameCompleteFaculty")
                        .IsUnique();

                    b.HasIndex("NameFaculty")
                        .IsUnique();

                    b.ToTable("Universities");
                });

            modelBuilder.Entity("backend.models.ButtonInformation", b =>
                {
                    b.HasOne("backend.models.Escene", null)
                        .WithMany("ListButtonInfo")
                        .HasForeignKey("EsceneId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.models.ButtonRedirect", b =>
                {
                    b.HasOne("backend.models.Escene", null)
                        .WithMany("ListButtonRed")
                        .HasForeignKey("EsceneId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.models.Escene", "PageToSender")
                        .WithMany()
                        .HasForeignKey("PageToSenderIdEscene");

                    b.HasOne("backend.models.Escene", null)
                        .WithMany()
                        .HasForeignKey("TargetEsceneId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("PageToSender");
                });

            modelBuilder.Entity("backend.models.Escene", b =>
                {
                    b.HasOne("backend.models.University", null)
                        .WithMany("ListEscenes")
                        .HasForeignKey("UniversityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.models.University", b =>
                {
                    b.HasOne("backend.models.AuthUser", null)
                        .WithMany("ListUniversitys")
                        .HasForeignKey("AuthUserIdAuthUser")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.models.AuthUser", b =>
                {
                    b.Navigation("ListUniversitys");
                });

            modelBuilder.Entity("backend.models.Escene", b =>
                {
                    b.Navigation("ListButtonInfo");

                    b.Navigation("ListButtonRed");
                });

            modelBuilder.Entity("backend.models.University", b =>
                {
                    b.Navigation("ListEscenes");
                });
#pragma warning restore 612, 618
        }
    }
}
