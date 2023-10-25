using System.Linq.Expressions;
using Application.Core;
using Application.Functions.Opinion.Dto;
using Application.Services;
using MediatR;

namespace Application.Functions.Opinion.Queries.QuizOpinions;

public class OpinionsGetQuizOpinionsHandler : IRequestHandler<OpinionGetQuizOpinionsQuery, Result<List<OpinionDto>>>
{
    private readonly IOpinionService _opinionService;

    public OpinionsGetQuizOpinionsHandler(IOpinionService opinionService)
    {
        _opinionService = opinionService;
    }

    public async Task<Result<List<OpinionDto>>> Handle(OpinionGetQuizOpinionsQuery request, CancellationToken cancellationToken)
    {
        var opinions = await _opinionService.GetByQuizProjected(request.QuizId, _predicate);

        return Result<List<OpinionDto>>.Success(opinions);
    }

    private readonly Expression<Func<Domain.Entities.Opinion, OpinionDto>> _predicate = opinion => new OpinionDto
    {
        Author = opinion.AppUser.UserName,
        Text = opinion.Text,
        Value = opinion.Value
    };
}