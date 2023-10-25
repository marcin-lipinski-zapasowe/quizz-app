using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Config;

public class OpinionConfig : IEntityTypeConfiguration<Opinion>
{
    public void Configure(EntityTypeBuilder<Opinion> builder)
    {
        builder.Property(opinion => opinion.Value).HasPrecision(1);
    }
}