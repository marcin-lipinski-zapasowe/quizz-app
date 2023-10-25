using Application.Core;
using Application.Functions.User.Dto;
using Application.Security;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using MediatR;

namespace Application.Functions.User.Commands.Register;

public class UserRegisterHandler : IRequestHandler<UserRegisterCommand, Result<AppUserDto>>
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public UserRegisterHandler(ITokenService tokenService, IUserService userService)
    {
        _tokenService = tokenService;
        _userService = userService;
    }

    public async Task<Result<AppUserDto>> Handle(UserRegisterCommand command, CancellationToken cancellationToken)
    {
        var appUser = new AppUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = command.Email,
            UserName = command.UserName
        };

        var systemUser = await _userService.GetByEmail(command.Email);
        if (systemUser is not null) throw new EmailAlreadyInUseException(appUser.Email);
        
        systemUser = await _userService.GetByUsername(command.UserName);
        if (systemUser is not null) throw new UserNameAlreadyInUseException(appUser.UserName);

        var result = await _userService.Create(appUser, command.Password);
        if(!result.Succeeded) throw new Exception(string.Join(",", result.Errors));

        var user = appUser.ProjectToDto();
        user.Token = _tokenService.CreateToken(appUser);

        return Result<AppUserDto>.Success(user);
    }
}