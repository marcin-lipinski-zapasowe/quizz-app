using Infrastructure.Persistence;

namespace Infrastructure.Services;

public class Service
{
    private protected readonly SqlServerQuizDbContext DbContext;

    protected Service(SqlServerQuizDbContext dbContext)
    {
        DbContext = dbContext;
    }

    public async Task SaveAsync()
    {
        await DbContext.SaveChangesAsync();
    }
}