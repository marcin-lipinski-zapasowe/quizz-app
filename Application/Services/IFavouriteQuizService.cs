using Domain.Entities;

namespace Application.Services;

public interface IFavouriteQuizService : IService
{
    Task Create(FavouriteQuiz favouriteQuiz);
    void Remove(FavouriteQuiz favouriteQuiz);
}