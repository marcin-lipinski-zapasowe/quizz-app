using Application.Core;
using Application.Functions.User.Dto;
using Application.Security;
using Application.Services;
using MediatR;
using Shared.Exceptions;

namespace Application.Functions.User.Commands.Login;

public class UserLoginHandler : IRequestHandler<UserLoginCommand, Result<AppUserDto>>
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public UserLoginHandler(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    public async Task<Result<AppUserDto>> Handle(UserLoginCommand command, CancellationToken cancellationToken)
    {
        var systemUser =
            await _userService.GetUserByUsernameEmail(command.EmailOrUsername, command.EmailOrUsername);
        if (systemUser is null) throw new NoSuchUserException();

        var result = await _userService.CheckPassword(systemUser, command.Password);
        if (!result) throw new UnauthorizedException();

        var appUserDto = systemUser.ProjectToDto();
        appUserDto.Token = _tokenService.CreateToken(systemUser);
            
        return Result<AppUserDto>.Success(appUserDto);
    }
}