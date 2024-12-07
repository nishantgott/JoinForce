using ArmyBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ArmyBackend.Repositories;
using ArmyBackend.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS to allow your Angular app to make requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Allow Angular app to make requests
              .AllowAnyHeader() // Allow any header
              .AllowAnyMethod(); // Allow any method (GET, POST, etc.)
    });
});

// Configure JWT Authentication
var secretKey = "YourSuperSecretKeyMustBeAtLeast32CharactersLong!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "YourIssuer", // Replace with your issuer
            ValidAudience = "YourAudience", // Replace with your audience
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

// Add Swagger for API documentation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Army Backend API",
        Version = "v1"
    });

    // To make Swagger UI aware of the JWT Authorization
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer",
        Description = "Please enter 'Bearer' followed by your token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Configure Database (Ensure you have a connection string in appsettings.json)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IVacancyRepository, VacancyRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<IExamRepository, ExamRepository>();
builder.Services.AddScoped<IExamResultRepository, ExamResultRepository>();
builder.Services.AddScoped<ICandidateProfileRepository, CandidateProfileRepository>();
builder.Services.AddScoped<IDocumentVerificationRepository, DocumentVerificationRepository>();
builder.Services.AddScoped<IEvaluationReportRepository, EvaluationReportRepository>();
builder.Services.AddScoped<IRecruitmentReportRepository, RecruitmentReportRepository>();
builder.Services.AddScoped<ITestScheduleRepository, TestScheduleRepository>();
builder.Services.AddScoped<ITrainingProgramRepository, TrainingProgramRepository>();

// Build the app
var app = builder.Build();

// Add middleware to the pipeline
app.UseHttpsRedirection();
app.UseCors("AllowAngularApp"); // Make sure this is set before routing
app.UseAuthentication(); // Ensure authentication comes before authorization
app.UseAuthorization();

// Configure Swagger UI for development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Army Backend API v1");
    });
}

// Map controllers
app.MapControllers();

// Run the application
app.Run();
