using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Functions.Quiz.Commands.Create;

public class QuizCreateCommand : IRequest<Result<Unit>>
{
    public string Id { get; set; }
    public GeneralContract General { get; set; }
    public List<QuestionContract> Questions { get; set; }
}

public class GeneralContract
{
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
}


public class QuestionContract
{
    public string Id { get; set; }
    public int Type { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public int Number { get; set; }
    public IFormFile Image { get; set; }
}

public class QuestionSelectionContract : QuestionContract
{
    public string CorrectAnswers { get; set; }
    public string AnswerA { get; set; }
    public string AnswerB { get; set; }
    public string AnswerC { get; set; }
    public string AnswerD { get; set; }
}

public class QuestionTrueFalseContract : QuestionContract
{
    public bool CorrectAnswer { get; set; }
}

public class QuestionRatingContract : QuestionContract
{
    public int Min { get; set; }
    public int Max { get; set; }
    public int Step { get; set; }
}

public class QuestionOpenContract : QuestionContract
{

}