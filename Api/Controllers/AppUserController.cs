using Application.Dto;
using Application.Functions.User.Commands.ChangePassword;
using Application.Functions.User.Commands.ChangeProfileImage;
using Application.Functions.User.Commands.ChangeUsername;
using Application.Functions.User.Commands.Login;
using Application.Functions.User.Commands.Register;
using Application.Functions.User.Dto;
using Application.Functions.User.Queries.CurrentUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("user")]
public class AppUserController : BaseController
{
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login(UserLoginCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register(UserRegisterCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [AllowAnonymous]
    [HttpGet("current")]
    public async Task<ActionResult> CurrentUser()
    {
        return HandleResult(await Mediator.Send(new UserGetCurrentUserQuery()));
    }
    
    [HttpPost("change/image")]
    public async Task<IActionResult> ChangeProfileImage([FromForm] UserChangeProfileImageCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("change/password")]
    public async Task<IActionResult> ChangePassword(UserChangePasswordCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
    
    [HttpPost("change/username")]
    public async Task<IActionResult> ChangeUsername(UserChangeUsernameCommand request)
    {
        return HandleResult(await Mediator.Send(request));
    }
}