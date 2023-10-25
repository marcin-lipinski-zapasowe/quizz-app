namespace Application.Functions.Session.Dto;

public record SessionQuizDto
{
    public string Id { get; set; }
    public string Title { get; init; }
}