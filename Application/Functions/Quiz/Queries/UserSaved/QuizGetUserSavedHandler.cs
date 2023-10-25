using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Application.Services;
using MediatR;

namespace Application.Functions.Quiz.Queries.UserSaved;

public class QuizGetUserSavedHandler : IRequestHandler<QuizGetUserSavedQuery, Result<PagedResult<QuizQuizDto>>>
{
    private readonly IQuizService _quizService;
    private readonly IUserService _userService;

    public QuizGetUserSavedHandler(IUserService userService, IQuizService quizService)
    {
        _userService = userService;
        _quizService = quizService;
    }

    public async Task<Result<PagedResult<QuizQuizDto>>> Handle(QuizGetUserSavedQuery command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        
        var quizzes = await _quizService.GetUserSavedPaged(command.SearchPattern, command.SortBy, command.SortDesc,
            command.PageNumber, user.Id);

        return Result<PagedResult<QuizQuizDto>>.Success(quizzes);
    }
}