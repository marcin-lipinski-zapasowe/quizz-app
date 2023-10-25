using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Config;

public class QuestionConfig : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        //builder.HasBaseType(typeof(Question));
        // builder.HasDiscriminator(quiz => quiz.Type)
        //     .HasValue<QuestionOpen>(QuestionType.Open)
        //     .HasValue<QuestionRating>(QuestionType.Rating)
        //     .HasValue<QuestionSelection>(QuestionType.Selection)
        //     .HasValue<QuestionTrueFalse>(QuestionType.TrueFalse);
    }
}