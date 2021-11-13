using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VaciControl.Migrations
{
    public partial class CorrigindoIntervaloProximaDose : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "intervaloProximaDose",
                table: "Vaccine",
                newName: "IntervaloProximaDose");

            migrationBuilder.AlterColumn<Guid>(
                name: "DiseaseId",
                table: "Vaccine",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IntervaloProximaDose",
                table: "Vaccine",
                newName: "intervaloProximaDose");

            migrationBuilder.AlterColumn<Guid>(
                name: "DiseaseId",
                table: "Vaccine",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
