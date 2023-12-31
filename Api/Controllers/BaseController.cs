using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
public class BaseController : ControllerBase
{
    private IMediator _mediator;
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value is not null) return Ok(result.Value);
        if (result.IsSuccess && result.Value is null) return NotFound();
        return BadRequest(result.Error);
    }
}