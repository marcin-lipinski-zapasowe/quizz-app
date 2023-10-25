using FluentValidation;

namespace Application.Functions.Question.Queries.QuizQuestions;

public class QuestionGetQuizQuestionsValidator : AbstractValidator<QuestionGetQuizQuestionsQuery>
{
    public QuestionGetQuizQuestionsValidator()
    {
        RuleFor(query => query.QuizId)
            .NotEmpty().WithMessage("Quiz Id is incorrect")
            .Length(Guid.Empty.ToString().Length).WithMessage("Quiz Id is incorrect");
    }
}