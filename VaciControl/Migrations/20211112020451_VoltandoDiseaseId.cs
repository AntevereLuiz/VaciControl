using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VaciControl.Migrations
{
    public partial class VoltandoDiseaseId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccine_Diseases_DiseaseId",
                table: "Vaccine");

            migrationBuilder.AlterColumn<Guid>(
                name: "DiseaseId",
                table: "Vaccine",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccine_Diseases_DiseaseId",
                table: "Vaccine",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccine_Diseases_DiseaseId",
                table: "Vaccine");

            migrationBuilder.AlterColumn<Guid>(
                name: "DiseaseId",
                table: "Vaccine",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccine_Diseases_DiseaseId",
                table: "Vaccine",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
