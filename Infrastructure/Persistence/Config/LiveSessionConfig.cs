using System.Text.Json;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Config;

public class LiveSessionConfig : IEntityTypeConfiguration<LiveSession>
{
    public void Configure(EntityTypeBuilder<LiveSession> builder)
    {
        builder.Property(session => session.EmailsInvitationsList)
            .HasConversion(value => string.Join(';', value),
                dbValue => dbValue.Split(';', StringSplitOptions.None).ToList());
    }
}