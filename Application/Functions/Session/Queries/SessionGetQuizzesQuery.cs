#nullable enable
using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using MediatR;

namespace Application.Functions.Session.Queries;

public class SessionGetQuizzesQuery : IRequest<Result<PagedResult<QuizQuizDto>>>
{
    public string? SearchPattern { get; set; }
    public bool SortDesc { get; set; }
    public int PageNumber { get; set; }
}