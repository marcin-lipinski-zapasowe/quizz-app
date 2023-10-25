using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Application.Services;
using MediatR;

namespace Application.Functions.Quiz.Queries.Public;

public class QuizGetPublicHandler : IRequestHandler<QuizGetPublicQuery, Result<PagedResult<QuizQuizDto>>> 
{
    private readonly IQuizService _quizService;
    private readonly IUserService _userService;

    public QuizGetPublicHandler(IUserService userService, IQuizService quizService)
    {
        _userService = userService;
        _quizService = quizService;
    }

    public async Task<Result<PagedResult<QuizQuizDto>>> Handle(QuizGetPublicQuery command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        var quizzes = await _quizService.GetPublicPaged(command.SearchPattern, command.SortBy, command.SortDesc,
            command.PageNumber, user.Id);

        return Result<PagedResult<QuizQuizDto>>.Success(quizzes);
    }
}