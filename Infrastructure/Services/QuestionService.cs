using System.Linq.Expressions;
using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class QuestionService : IQuestionService
{
    private readonly SqlServerQuizDbContext _dbContext;

    public QuestionService(SqlServerQuizDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<T>> GetQuestionsByQuizProjected<T>(string quizId, Expression<Func<Question, T>> predicate)
    {
        return await _dbContext.Questions
            .Where(question => question.QuizId.Equals(quizId))
            .Select(predicate)
            .ToListAsync();
    }
}