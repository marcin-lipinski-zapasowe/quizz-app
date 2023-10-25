using System.Linq.Expressions;
using Domain.Entities;

namespace Application.Services;

public interface IOpinionService
{
    Task<List<T>> GetByQuizProjected<T>(string quizId, Expression<Func<Opinion, T>> predicate);
}