namespace Domain.Entities;

public class FavouriteQuiz
{
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }

    public string QuizId { get; set; }
    public Quiz Quiz { get; set; }
}