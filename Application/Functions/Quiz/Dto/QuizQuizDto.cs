namespace Application.Functions.Quiz.Dto;

public record QuizQuizDto
{
    public string Id { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
    public string AuthorName{ get; init; }
    public int QuestionsAmount{ get; init; }
    public float AverageOpinion{ get; init; }
    public int SessionsAmount{ get; init; }
    public bool IsFavourite { get; set; }
}