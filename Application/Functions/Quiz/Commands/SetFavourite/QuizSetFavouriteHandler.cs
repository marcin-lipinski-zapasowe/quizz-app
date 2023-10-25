using Application.Core;
using Application.Services;
using Domain.Entities;
using MediatR;

namespace Application.Functions.Quiz.Commands.SetFavourite;

public class QuizSetFavouriteHandler : IRequestHandler<QuizSetFavouriteCommand, Result<Unit>>
{
    private readonly IUserService _userService;
    private readonly IFavouriteQuizService _favouriteQuizService;

    public QuizSetFavouriteHandler(IFavouriteQuizService favouriteQuizService, IUserService userService)
    {
        _favouriteQuizService = favouriteQuizService;
        _userService = userService;
    }

    public async Task<Result<Unit>> Handle(QuizSetFavouriteCommand command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        
        if (command.IsFavourite)
        {
            var entry = new FavouriteQuiz
            {
                AppUserId = user.Id,
                QuizId = command.QuizId
            };
            await _favouriteQuizService.Create(entry);
        }
        else 
        {
            var entry = new FavouriteQuiz { AppUserId = user.Id, QuizId = command.QuizId };
            _favouriteQuizService.Remove(entry);
        }
            
        await _favouriteQuizService.SaveAsync();
        return Result<Unit>.Success(Unit.Value);
    }
}