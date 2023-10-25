using Application.Core;
using MediatR;

namespace Application.Functions.Quiz.Commands.SetFavourite;

public class QuizSetFavouriteCommand : IRequest<Result<Unit>>
{
    public string QuizId { get; set; }
    public bool IsFavourite { get; set; }
}