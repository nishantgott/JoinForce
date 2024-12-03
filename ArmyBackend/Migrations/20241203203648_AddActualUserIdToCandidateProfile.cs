using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddActualUserIdToCandidateProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActualUserId",
                table: "CandidateProfiles",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualUserId",
                table: "CandidateProfiles");
        }
    }
}
