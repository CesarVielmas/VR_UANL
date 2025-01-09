using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DB_CREATE_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AuthUsers",
                columns: table => new
                {
                    IdAuthUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UserPassword = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UserLevel = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    UserConectionDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthUsers", x => x.IdAuthUser);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Universities",
                columns: table => new
                {
                    IdUniversity = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    NameFaculty = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    NameCompleteFaculty = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    LogoFaculty = table.Column<string>(type: "longtext", nullable: false),
                    ImageFaculty = table.Column<string>(type: "longtext", nullable: false),
                    AuthUserIdAuthUser = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universities", x => x.IdUniversity);
                    table.ForeignKey(
                        name: "FK_Universities_AuthUsers_AuthUserIdAuthUser",
                        column: x => x.AuthUserIdAuthUser,
                        principalTable: "AuthUsers",
                        principalColumn: "IdAuthUser",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Escenes",
                columns: table => new
                {
                    IdEscene = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    NamePositionScene = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    NameScene = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    ImageScene = table.Column<string>(type: "longtext", nullable: false),
                    UniversityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Escenes", x => x.IdEscene);
                    table.ForeignKey(
                        name: "FK_Escenes_Universities_UniversityId",
                        column: x => x.UniversityId,
                        principalTable: "Universities",
                        principalColumn: "IdUniversity",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ButtonInformations",
                columns: table => new
                {
                    IdButtonInformation = table.Column<int>(type: "int", nullable: false),
                    ButtonLarge = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    ButtonHigh = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    ButtonWidth = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    PositionX = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false),
                    PositionY = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    PositionZ = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false),
                    RotationSideX = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    RotationSideY = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    RotationSideZ = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    OptionalImage = table.Column<string>(type: "longtext", nullable: true),
                    NameCompleteFaculty = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ButtonInformations", x => x.IdButtonInformation);
                    table.ForeignKey(
                        name: "FK_ButtonInformations_Escenes_IdButtonInformation",
                        column: x => x.IdButtonInformation,
                        principalTable: "Escenes",
                        principalColumn: "IdEscene",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ButtonRedirects",
                columns: table => new
                {
                    IdButtonRedirect = table.Column<int>(type: "int", nullable: false),
                    ButtonLarge = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    ButtonHigh = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    ButtonWidth = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    PositionX = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false),
                    PositionY = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    PositionZ = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false),
                    RotationSideX = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    RotationSideY = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    RotationSideZ = table.Column<decimal>(type: "decimal(6,3)", precision: 6, scale: 3, nullable: false),
                    HorientationButton = table.Column<string>(type: "longtext", nullable: false),
                    EsceneId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ButtonRedirects", x => x.IdButtonRedirect);
                    table.ForeignKey(
                        name: "FK_ButtonRedirects_Escenes_EsceneId",
                        column: x => x.EsceneId,
                        principalTable: "Escenes",
                        principalColumn: "IdEscene");
                    table.ForeignKey(
                        name: "FK_ButtonRedirects_Escenes_IdButtonRedirect",
                        column: x => x.IdButtonRedirect,
                        principalTable: "Escenes",
                        principalColumn: "IdEscene",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ButtonRedirects_EsceneId",
                table: "ButtonRedirects",
                column: "EsceneId");

            migrationBuilder.CreateIndex(
                name: "IX_Escenes_NamePositionScene",
                table: "Escenes",
                column: "NamePositionScene",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Escenes_UniversityId",
                table: "Escenes",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_Universities_AuthUserIdAuthUser",
                table: "Universities",
                column: "AuthUserIdAuthUser");

            migrationBuilder.CreateIndex(
                name: "IX_Universities_NameCompleteFaculty",
                table: "Universities",
                column: "NameCompleteFaculty",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Universities_NameFaculty",
                table: "Universities",
                column: "NameFaculty",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ButtonInformations");

            migrationBuilder.DropTable(
                name: "ButtonRedirects");

            migrationBuilder.DropTable(
                name: "Escenes");

            migrationBuilder.DropTable(
                name: "Universities");

            migrationBuilder.DropTable(
                name: "AuthUsers");
        }
    }
}
