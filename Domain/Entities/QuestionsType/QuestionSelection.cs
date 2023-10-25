using Shared.Enums;

namespace Domain.Entities.QuestionsType;

public class QuestionSelection : Question
{
    public SelectionCorrectAnswers CorrectAnswers { get; set; }
    public string AnswerA { get; set; }
    public string AnswerB { get; set; }
    public string AnswerC { get; set; }
    public string AnswerD { get; set; }
}