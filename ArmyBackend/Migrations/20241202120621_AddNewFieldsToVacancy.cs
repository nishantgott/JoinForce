using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddNewFieldsToVacancy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppliedCount",
                table: "Vacancies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "Vacancies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ExperienceMax",
                table: "Vacancies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExperienceMin",
                table: "Vacancies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "JobDetails",
                table: "Vacancies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppliedCount",
                table: "Vacancies");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "Vacancies");

            migrationBuilder.DropColumn(
                name: "ExperienceMax",
                table: "Vacancies");

            migrationBuilder.DropColumn(
                name: "ExperienceMin",
                table: "Vacancies");

            migrationBuilder.DropColumn(
                name: "JobDetails",
                table: "Vacancies");
        }
    }
}
