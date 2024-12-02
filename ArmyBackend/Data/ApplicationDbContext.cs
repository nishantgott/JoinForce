using Microsoft.EntityFrameworkCore;

namespace ArmyBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define DbSets for your models (tables)
        public DbSet<User> Users { get; set; }
        public DbSet<Vacancy> Vacancies { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<TestSchedule> TestSchedules { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamResult> ExamResults { get; set; }
        public DbSet<DocumentVerification> DocumentVerifications { get; set; }
        public DbSet<TrainingProgram> TrainingPrograms { get; set; }
        public DbSet<CandidateProfile> CandidateProfiles { get; set; }
        public DbSet<EvaluationReport> EvaluationReports { get; set; }
        public DbSet<RecruitmentReport> RecruitmentReports { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<PlatformAccess> PlatformAccesses { get; set; }
    }
}
