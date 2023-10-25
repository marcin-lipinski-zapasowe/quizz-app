using Application.Core;
using Application.Functions.User.Dto;
using Application.Security;
using Application.Services;
using MediatR;
using Shared.Exceptions;

namespace Application.Functions.User.Queries.CurrentUser;

public class UserGetCurrentUserHandler : IRequestHandler<UserGetCurrentUserQuery, Result<AppUserDto>>
{
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;

    public UserGetCurrentUserHandler(ITokenService tokenService, IUserService userService)
    {
        _tokenService = tokenService;
        _userService = userService;
    }

    public async Task<Result<AppUserDto>> Handle(UserGetCurrentUserQuery command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        if (user is null) throw new UnauthorizedException();
            
        var appUserDto = user.ProjectToDto();
        appUserDto.Token = _tokenService.CreateToken(user);
            
        return Result<AppUserDto>.Success(appUserDto);
    }
}