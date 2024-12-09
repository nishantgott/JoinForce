using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddUsernameToPlatformAccess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "PlatformAccesses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "PlatformAccesses");
        }
    }
}
