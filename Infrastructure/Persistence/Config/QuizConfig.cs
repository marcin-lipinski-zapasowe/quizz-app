using Domain.Entities;
using Domain.Entities.QuestionsType;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shared.Enums;

namespace Infrastructure.Persistence.Config;

public class QuizConfig : IEntityTypeConfiguration<Quiz>
{
    public void Configure(EntityTypeBuilder<Quiz> builder)
    {
        builder
            .HasMany(quiz => quiz.Opinions)
            .WithOne(opinion => opinion.Quiz)
            .HasForeignKey(opinion => opinion.QuizId);
        
        builder
            .HasMany(quiz => quiz.Sessions)
            .WithOne(session => session.Quiz)
            .HasForeignKey(session => session.QuizId);

        builder.HasMany(quiz => quiz.Questions)
            .WithOne(question => question.Quiz)
            .HasForeignKey(question => question.QuizId);
    }
}