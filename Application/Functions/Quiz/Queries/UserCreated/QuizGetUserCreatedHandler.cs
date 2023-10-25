using Application.Core;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Application.Services;
using MediatR;

namespace Application.Functions.Quiz.Queries.UserCreated;

public class QuizGetUserCreatedHandler : IRequestHandler<QuizGetUserCreatedQuery, Result<PagedResult<QuizQuizDto>>>
{
    private readonly IQuizService _quizService;
    private readonly IUserService _userService;

    public QuizGetUserCreatedHandler(IUserService userService, IQuizService quizService)
    {
        _userService = userService;
        _quizService = quizService;
    }

    public async Task<Result<PagedResult<QuizQuizDto>>> Handle(QuizGetUserCreatedQuery command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        
        var quizzes = await _quizService.GetUserCreatedPaged(command.SearchPattern, command.SortBy, command.SortDesc,
            command.PageNumber, user.Id);

        return Result<PagedResult<QuizQuizDto>>.Success(quizzes);
    }
}