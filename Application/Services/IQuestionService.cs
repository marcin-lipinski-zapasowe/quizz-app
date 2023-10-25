using System.Linq.Expressions;
using Domain.Entities;

namespace Application.Services;

public interface IQuestionService
{
    Task<List<T>> GetQuestionsByQuizProjected<T>(string quizId, Expression<Func<Question, T>> predicate);
}