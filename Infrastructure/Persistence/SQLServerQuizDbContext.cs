using Domain.Entities;
using Domain.Entities.QuestionsType;
using Infrastructure.Persistence.Config;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class SqlServerQuizDbContext : IdentityDbContext<AppUser>
{
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Opinion> Opinions { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionSelection> QuestionsSelection { get; set; }
    public DbSet<QuestionTrueFalse> QuestionsTrueFalse { get; set; }
    public DbSet<QuestionRating> QuestionsRating { get; set; }
    public DbSet<QuestionOpen> QuestionsOpen { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<LiveSession> Sessions { get; set; }
    public DbSet<FavouriteQuiz> FavouriteQuizzes { get; set; }

    public SqlServerQuizDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(QuizConfig).Assembly);
    }
}