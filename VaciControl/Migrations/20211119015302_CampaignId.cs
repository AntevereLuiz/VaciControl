using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VaciControl.Migrations
{
    public partial class CampaignId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgeGroups_Campaigns_CampaignId",
                table: "AgeGroups");

            migrationBuilder.AlterColumn<Guid>(
                name: "CampaignId",
                table: "AgeGroups",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AgeGroups_Campaigns_CampaignId",
                table: "AgeGroups",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgeGroups_Campaigns_CampaignId",
                table: "AgeGroups");

            migrationBuilder.AlterColumn<Guid>(
                name: "CampaignId",
                table: "AgeGroups",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_AgeGroups_Campaigns_CampaignId",
                table: "AgeGroups",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
