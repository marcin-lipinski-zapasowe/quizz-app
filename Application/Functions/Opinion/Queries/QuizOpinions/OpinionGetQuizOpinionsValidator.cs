using FluentValidation;

namespace Application.Functions.Opinion.Queries.QuizOpinions;

public class OpinionGetQuizOpinionsValidator : AbstractValidator<OpinionGetQuizOpinionsQuery>
{
    public OpinionGetQuizOpinionsValidator()
    {
        RuleFor(query => query.QuizId)
            .NotEmpty().WithMessage("Quiz Id is incorrect")
            .Length(Guid.Empty.ToString().Length).WithMessage("Quiz Id is incorrect");
    }
}