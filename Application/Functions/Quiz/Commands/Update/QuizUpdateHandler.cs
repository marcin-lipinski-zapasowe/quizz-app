using Application.Contracts.Quiz.Commands;
using Application.Core;
using Application.Services;
using MediatR;

namespace Application.Functions.Quiz.Commands.Update;

public class QuizUpdateHandler : IRequestHandler<QuizUpdateCommand, Result<Unit>>
{
    private readonly IQuizService  _quizService;

    public QuizUpdateHandler(IQuizService quizService)
    {
        _quizService = quizService;
    }

    public async Task<Result<Unit>> Handle(QuizUpdateCommand command, CancellationToken cancellationToken)
    {
            
        //_dbContext.Quizzes.Update(new Domain.Entities.Quiz());
        //await _dbContext.SaveChangesAsynch();
        return Result<Unit>.Success(Unit.Value);
    }
}