using System.Linq.Expressions;
using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class OpinionService : IOpinionService
{
    private readonly SqlServerQuizDbContext _dbContext;

    public OpinionService(SqlServerQuizDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<T>> GetByQuizProjected<T>(string quizId, Expression<Func<Opinion, T>> predicate)
    {
        return await _dbContext.Opinions
            .Where(opinion => opinion.QuizId.Equals(quizId))
            .Select(predicate).ToListAsync();
    }
}