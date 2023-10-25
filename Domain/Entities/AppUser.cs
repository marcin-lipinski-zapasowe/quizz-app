using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class AppUser : IdentityUser
{
    public Image ProfileImage { get; set; }
    public List<Quiz> Quizzes { get; set; } = new();
    public List<Opinion> Opinions { get; set; } = new();
    public List<FavouriteQuiz> FavouriteQuizzes { get; set; } = new();
}