namespace Domain.Entities.QuestionsType;

public class QuestionRating : Question
{
    public int Min { get; set; }
    public int Max { get; set; }
    public int Step { get; set; }
}