using FluentValidation;

namespace Application.Functions.Quiz.Queries.Public;

public class QuizGetPublicValidator : AbstractValidator<QuizGetPublicQuery>
{
    public QuizGetPublicValidator()
    {
        RuleFor(query => query.PageNumber)
            .GreaterThan(0).WithMessage("Incorrect page number");
    }
}