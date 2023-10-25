#nullable enable
using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using MediatR;

namespace Application.Functions.Quiz.Queries.Public;

public record QuizGetPublicQuery : IRequest<Result<PagedResult<QuizQuizDto>>>
{
    public string? SearchPattern { get; set; }
    public string? SortBy { get; set; }
    public bool SortDesc { get; set; }
    public int PageNumber { get; set; }
}