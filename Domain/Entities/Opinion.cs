namespace Domain.Entities;

public class Opinion
{
    public string OpinionId { get; set; }
    public string Text { get; set; }
    public double Value { get; set; }
    public string QuizId { get; set; }
    public Quiz Quiz { get; set; }
    
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}