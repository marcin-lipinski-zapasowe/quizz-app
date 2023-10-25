using System.Text.Json;
using Application.Contracts.Quiz.Commands;
using Application.Functions.Opinion.Queries.QuizOpinions;
using Application.Functions.Question.Queries.QuizQuestions;
using Application.Functions.Quiz.Commands.Create;
using Application.Functions.Quiz.Commands.SetFavourite;
using Application.Functions.Quiz.Queries.Public;
using Application.Functions.Quiz.Queries.UserCreated;
using Application.Functions.Quiz.Queries.UserSaved;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("/quiz")]
public class QuizController : BaseController
{
    [HttpPost("create")]
    public async Task<ActionResult> Create([FromForm] QuizCreateCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("update")]
    public async Task<ActionResult> Update(QuizUpdateCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("public")]
    public async Task<ActionResult> GetAllPublic(QuizGetPublicQuery request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("user")]
    public async Task<ActionResult> GetUserQuizzes(QuizGetUserCreatedQuery request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("saved")]
    public async Task<ActionResult> GetSavedQuizzes(QuizGetUserSavedQuery request)
    {
        return HandleResult(await Mediator.Send(request));
    }

    [HttpPost("favourite")]
    public async Task<ActionResult> GetAllUser(QuizSetFavouriteCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpGet("opinions/{quizId}")]
    public async Task<ActionResult> GetAllUser(string quizId)
    {
        return HandleResult(await Mediator.Send(new OpinionGetQuizOpinionsQuery{QuizId = quizId}));
    }
    
    [HttpGet("details/{quizId}")]
    public async Task<ActionResult> GetDetails(string quizId)
    {
        return HandleResult(await Mediator.Send(new QuestionGetQuizQuestionsQuery{QuizId = quizId}));
    }
}