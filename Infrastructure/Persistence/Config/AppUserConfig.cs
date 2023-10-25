using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Config;

public class AppUserConfig : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder
            .HasMany(user => user.Quizzes)
            .WithOne(quiz => quiz.Author)
            .HasForeignKey(quiz => quiz.AuthorId);
        
        builder
            .HasMany(user => user.Opinions)
            .WithOne(quiz => quiz.AppUser)
            .HasForeignKey(quiz => quiz.AppUserId);
    }
}