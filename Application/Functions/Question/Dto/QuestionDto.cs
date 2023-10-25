using Shared.Enums;

namespace Application.Functions.Question.Dto;

public class QuestionDto
{
    public string Id { get; set; }
    public QuestionType Type { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public int Number { get; set; }
    public string QuestionImageUrl { get; set; }
}

public class QuestionSelectionContract : QuestionDto
{
    public SelectionCorrectAnswers CorrectAnswers { get; set; }
    public string AnswerA { get; set; }
    public string AnswerB { get; set; }
    public string AnswerC { get; set; }
    public string AnswerD { get; set; }
}

public class QuestionRatingContract : QuestionDto
{
    public int Min { get; set; }
    public int Max { get; set; }
    public int Step { get; set; }
}

public class QuestionTrueFalseContract : QuestionDto
{
    public bool CorrectAnswer { get; set; }
}

public class QuestionOpenContract : QuestionDto
{}