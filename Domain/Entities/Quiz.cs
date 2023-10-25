namespace Domain.Entities;

public class Quiz
{
    public string QuizId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<Question> Questions { get; set; }
    public List<LiveSession> Sessions { get; set; }
    public List<Opinion> Opinions { get; set; }
    public string AuthorId { get; set; }
    public AppUser Author { get; set; }
    public bool IsPublic { get; set; }
    public IEnumerable<FavouriteQuiz> AppUsersFavourite { get; } = new List<FavouriteQuiz>();
}