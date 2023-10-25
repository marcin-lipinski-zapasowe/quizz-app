using FluentValidation;

namespace Application.Functions.Quiz.Queries.UserCreated;

public class QuizGetUserCreatedValidator : AbstractValidator<QuizGetUserCreatedQuery>
{
    public QuizGetUserCreatedValidator()
    {
        RuleFor(query => query.PageNumber)
            .GreaterThan(0).WithMessage("Incorrect page number");
    }
}