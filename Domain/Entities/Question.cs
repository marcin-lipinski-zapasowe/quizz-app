using Shared.Enums;

namespace Domain.Entities;

public class Question
{
    public string QuestionId { get; set; }
    public QuestionType Type { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public int Number { get; set; }
    public Image Image { get; set; }
    public string QuizId { get; set; }
    public Quiz Quiz { get; set; }
}