using Application.Functions.Session.Commands;
using Application.Functions.Session.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("/session")]
public class SessionController : BaseController
{
    [HttpPost("get")]
    public async Task<ActionResult> GetListOfPossibleQuizzes(SessionGetQuizzesQuery request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("new")]
    public async Task<ActionResult> NewSession(SessionNewSessionCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
}