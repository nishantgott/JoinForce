using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserNotificationsId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserNotifications",
                columns: table => new
                {
                    UserNotificationsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotifications", x => x.UserNotificationsId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserNotificationsId",
                table: "Notifications",
                column: "UserNotificationsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_UserNotifications_UserNotificationsId",
                table: "Notifications",
                column: "UserNotificationsId",
                principalTable: "UserNotifications",
                principalColumn: "UserNotificationsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_UserNotifications_UserNotificationsId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "UserNotifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserNotificationsId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserNotificationsId",
                table: "Notifications");
        }
    }
}
