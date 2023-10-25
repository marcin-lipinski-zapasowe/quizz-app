using FluentValidation;

namespace Application.Functions.Quiz.Commands.SetFavourite;

public class QuizSetFavouriteValidator : AbstractValidator<QuizSetFavouriteCommand>
{
    public QuizSetFavouriteValidator()
    {
        RuleFor(command => command.QuizId)
            .NotEmpty().WithMessage("Quiz Id is incorrect")
            .Length(Guid.Empty.ToString().Length).WithMessage("Quiz Id is incorrect");
    }
}