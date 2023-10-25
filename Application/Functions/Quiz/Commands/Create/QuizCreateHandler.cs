using Application.Core;
using Application.Services;
using MediatR;

namespace Application.Functions.Quiz.Commands.Create;

public class QuizCreateHandler : IRequestHandler<QuizCreateCommand, Result<Unit>>
{
    private readonly IQuizService _quizService;
    private readonly IUserService _userService;
    private readonly IFilesService _filesService;

    public QuizCreateHandler(IFilesService filesService, IUserService userService, IQuizService quizService)
    {
        _filesService = filesService;
        _userService = userService;
        _quizService = quizService;
    }

    public async Task<Result<Unit>> Handle(QuizCreateCommand command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();

        var domainQuiz = command.ProjectToDomain();
        domainQuiz.Author = user;
        domainQuiz.AuthorId = user.Id;
        
        for (var i = 0; i < command.Questions.Count; i++)
        {
            if (command.Questions[i].Image == null) continue;
            var questionImage = await _filesService.CreateQuestionImage(command.Id, command.Questions[i].Id, command.Questions[i].Image);
            domainQuiz.Questions[i].Image = questionImage;
        }
        
        await _quizService.Create(domainQuiz);
        await _quizService.SaveAsync();
            
        return Result<Unit>.Success(Unit.Value); 
    }
}