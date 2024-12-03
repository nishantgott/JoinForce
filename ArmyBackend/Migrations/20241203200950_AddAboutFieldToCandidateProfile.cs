using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAboutFieldToCandidateProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "About",
                table: "CandidateProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "About",
                table: "CandidateProfiles");
        }
    }
}
