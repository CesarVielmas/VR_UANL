using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DB_CREATE_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ButtonInformations_Escenes_IdButtonInformation",
                table: "ButtonInformations");

            migrationBuilder.DropForeignKey(
                name: "FK_ButtonRedirects_Escenes_EsceneId",
                table: "ButtonRedirects");

            migrationBuilder.DropForeignKey(
                name: "FK_ButtonRedirects_Escenes_IdButtonRedirect",
                table: "ButtonRedirects");

            migrationBuilder.AlterColumn<int>(
                name: "IdButtonRedirect",
                table: "ButtonRedirects",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "PageToSenderIdEscene",
                table: "ButtonRedirects",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TargetEsceneId",
                table: "ButtonRedirects",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "IdButtonInformation",
                table: "ButtonInformations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "EsceneId",
                table: "ButtonInformations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ButtonRedirects_PageToSenderIdEscene",
                table: "ButtonRedirects",
                column: "PageToSenderIdEscene");

            migrationBuilder.CreateIndex(
                name: "IX_ButtonRedirects_TargetEsceneId",
                table: "ButtonRedirects",
                column: "TargetEsceneId");

            migrationBuilder.CreateIndex(
                name: "IX_ButtonInformations_EsceneId",
                table: "ButtonInformations",
                column: "EsceneId");

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonInformations_Escenes_EsceneId",
                table: "ButtonInformations",
                column: "EsceneId",
                principalTable: "Escenes",
                principalColumn: "IdEscene",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonRedirects_Escenes_EsceneId",
                table: "ButtonRedirects",
                column: "EsceneId",
                principalTable: "Escenes",
                principalColumn: "IdEscene",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonRedirects_Escenes_PageToSenderIdEscene",
                table: "ButtonRedirects",
                column: "PageToSenderIdEscene",
                principalTable: "Escenes",
                principalColumn: "IdEscene");

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonRedirects_Escenes_TargetEsceneId",
                table: "ButtonRedirects",
                column: "TargetEsceneId",
                principalTable: "Escenes",
                principalColumn: "IdEscene",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ButtonInformations_Escenes_EsceneId",
                table: "ButtonInformations");

            migrationBuilder.DropForeignKey(
                name: "FK_ButtonRedirects_Escenes_EsceneId",
                table: "ButtonRedirects");

            migrationBuilder.DropForeignKey(
                name: "FK_ButtonRedirects_Escenes_PageToSenderIdEscene",
                table: "ButtonRedirects");

            migrationBuilder.DropForeignKey(
                name: "FK_ButtonRedirects_Escenes_TargetEsceneId",
                table: "ButtonRedirects");

            migrationBuilder.DropIndex(
                name: "IX_ButtonRedirects_PageToSenderIdEscene",
                table: "ButtonRedirects");

            migrationBuilder.DropIndex(
                name: "IX_ButtonRedirects_TargetEsceneId",
                table: "ButtonRedirects");

            migrationBuilder.DropIndex(
                name: "IX_ButtonInformations_EsceneId",
                table: "ButtonInformations");

            migrationBuilder.DropColumn(
                name: "PageToSenderIdEscene",
                table: "ButtonRedirects");

            migrationBuilder.DropColumn(
                name: "TargetEsceneId",
                table: "ButtonRedirects");

            migrationBuilder.DropColumn(
                name: "EsceneId",
                table: "ButtonInformations");

            migrationBuilder.AlterColumn<int>(
                name: "IdButtonRedirect",
                table: "ButtonRedirects",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "IdButtonInformation",
                table: "ButtonInformations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonInformations_Escenes_IdButtonInformation",
                table: "ButtonInformations",
                column: "IdButtonInformation",
                principalTable: "Escenes",
                principalColumn: "IdEscene",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonRedirects_Escenes_EsceneId",
                table: "ButtonRedirects",
                column: "EsceneId",
                principalTable: "Escenes",
                principalColumn: "IdEscene");

            migrationBuilder.AddForeignKey(
                name: "FK_ButtonRedirects_Escenes_IdButtonRedirect",
                table: "ButtonRedirects",
                column: "IdButtonRedirect",
                principalTable: "Escenes",
                principalColumn: "IdEscene",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
