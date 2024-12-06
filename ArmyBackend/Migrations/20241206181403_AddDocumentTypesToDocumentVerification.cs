using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddDocumentTypesToDocumentVerification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Document1Type",
                table: "DocumentVerifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Document2Type",
                table: "DocumentVerifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Document3Type",
                table: "DocumentVerifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Document1Type",
                table: "DocumentVerifications");

            migrationBuilder.DropColumn(
                name: "Document2Type",
                table: "DocumentVerifications");

            migrationBuilder.DropColumn(
                name: "Document3Type",
                table: "DocumentVerifications");
        }
    }
}
