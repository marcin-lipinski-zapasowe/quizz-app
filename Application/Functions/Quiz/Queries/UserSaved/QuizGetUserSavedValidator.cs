using FluentValidation;

namespace Application.Functions.Quiz.Queries.UserSaved;

public class QuizGetUserSavedValidator : AbstractValidator<QuizGetUserSavedQuery>
{
    public QuizGetUserSavedValidator()
    {
        RuleFor(query => query.PageNumber)
            .GreaterThan(0).WithMessage("Incorrect page number");
    }
}