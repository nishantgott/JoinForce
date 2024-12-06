using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArmyBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRecruitmentReportModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicationCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ExamAverageMarks",
                table: "RecruitmentReports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ExamFailCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExamPassCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExamTakenCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PendingCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RejectedCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReviewedCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SelectedCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShortlistedCount",
                table: "RecruitmentReports",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ExamAverageMarks",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ExamFailCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ExamPassCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ExamTakenCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "PendingCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "RejectedCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ReviewedCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "SelectedCount",
                table: "RecruitmentReports");

            migrationBuilder.DropColumn(
                name: "ShortlistedCount",
                table: "RecruitmentReports");
        }
    }
}
