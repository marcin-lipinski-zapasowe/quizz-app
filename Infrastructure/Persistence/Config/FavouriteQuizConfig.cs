using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Config;

public class FavouriteQuizConfig : IEntityTypeConfiguration<FavouriteQuiz>
{
    public void Configure(EntityTypeBuilder<FavouriteQuiz> builder)
    {
        builder
            .HasKey(fq => new { fq.AppUserId, fq.QuizId });
        
        builder
            .HasOne(fq => fq.AppUser)
            .WithMany(u => u.FavouriteQuizzes)
            .HasForeignKey(fq => fq.AppUserId);

        builder
            .HasOne(fq => fq.Quiz)
            .WithMany(q => q.AppUsersFavourite)
            .HasForeignKey(fq => fq.QuizId);
    }
}