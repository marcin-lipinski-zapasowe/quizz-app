using FluentValidation;

namespace Application.Functions.Quiz.Commands.Create;

public class QuizCreateValidator : AbstractValidator<QuizCreateCommand>
{
    public QuizCreateValidator()
    {
        RuleFor(command => command.Id)
            .NotEmpty().WithMessage("Refresh and try again")
            .Length(Guid.Empty.ToString().Length).WithMessage("Refresh and try again");

        RuleFor(command => command.General.Title)
            .NotEmpty().WithMessage("Quiz title can not be empty")
            .MinimumLength(10).WithMessage("Quiz title should be at least 10 characters long.")
            .MaximumLength(50).WithMessage("Quiz title should not be longer than 50 characters");
        
        RuleFor(command => command.General.Description)
            .NotEmpty().WithMessage("Quiz description can not be empty")
            .MinimumLength(25).WithMessage("Quiz description should be at least 25 characters long.")
            .MaximumLength(400).WithMessage("Quiz title should not be longer than 400 characters");

        RuleFor(command => command.Questions)
            .NotNull().WithMessage("The list of questions can not be empty")
            .NotEmpty().WithMessage("The list of questions can not be empty")
            .Must(questions => questions.Count <= 30)
            .WithMessage("The list of questions cannot contain more than 25 questions.")
            .ForEach(question => question.SetValidator(new QuizCreateQuestionValidator()));
    }
}

internal class QuizCreateQuestionValidator : AbstractValidator<QuestionContract>
{
    public QuizCreateQuestionValidator()
    {
        this.
        RuleFor(question => question.Id)
            .NotEmpty().WithMessage("Refresh and try again")
            .Length(Guid.Empty.ToString().Length).WithMessage("Refresh and try again");
        
        RuleFor(question => question.Content)
            .MinimumLength(10).WithMessage(question => $"Question {question.Number} content should be at least 8 characters long.")
            .MaximumLength(70).WithMessage(question => $"Question {question.Number} content should not be longer than 70 characters");

        RuleFor(question => question.Type)
            .Must(qtype => qtype >= 0 && qtype <= 3).WithMessage(question =>
                $"Incorrect question {question.Number} type. Delete and create it again.");

        RuleFor(question => question.Number)
            .GreaterThan(0);
    }
}