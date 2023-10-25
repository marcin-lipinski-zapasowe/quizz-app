using Application.Core;
using Application.Dto;
using Application.Functions.Opinion.Dto;
using MediatR;

namespace Application.Functions.Opinion.Queries.QuizOpinions;

public class OpinionGetQuizOpinionsQuery : IRequest<Result<List<OpinionDto>>>
{
    public string QuizId { get; set; }
}