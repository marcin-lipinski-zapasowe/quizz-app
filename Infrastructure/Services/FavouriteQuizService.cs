using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;

namespace Infrastructure.Services;

public class FavouriteQuizService : IFavouriteQuizService
{
    private readonly SqlServerQuizDbContext _dbContext;

    public FavouriteQuizService(SqlServerQuizDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Create(FavouriteQuiz favouriteQuiz)
    {
        await _dbContext.FavouriteQuizzes.AddAsync(favouriteQuiz);
    }

    public void Remove(FavouriteQuiz favouriteQuiz)
    {
        _dbContext.FavouriteQuizzes.Remove(favouriteQuiz);
    }

    public async Task SaveAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}