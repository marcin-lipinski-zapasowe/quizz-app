using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Application.Services;
using MediatR;

namespace Application.Functions.Session.Queries;

public class SessionGetQuizzesHandler : IRequestHandler<SessionGetQuizzesQuery, Result<PagedResult<QuizQuizDto>>>
{
    private readonly IQuizService _quizService;
    private readonly IUserService _userService;

    public SessionGetQuizzesHandler(IUserService userService, IQuizService quizService)
    {
        _userService = userService;
        _quizService = quizService;
    }

    public async Task<Result<PagedResult<QuizQuizDto>>> Handle(SessionGetQuizzesQuery request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        var quizzes = await _quizService.GetCreatedAndSavedPaged(request.SearchPattern, "", request.SortDesc,
            request.PageNumber, user.Id);

        return Result<PagedResult<QuizQuizDto>>.Success(quizzes);
    }
}