using Application.Core;
using Application.Services;
using MediatR;
using Shared.Exceptions;

namespace Application.Functions.User.Commands.ChangePassword;

public class UserChangePasswordHandler : IRequestHandler<UserChangePasswordCommand, Result<Unit>>
{
    private readonly IUserService _userService;

    public UserChangePasswordHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<Result<Unit>> Handle(UserChangePasswordCommand command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();

        var passwordCheckResult = await _userService.CheckPassword(user, command.OldPassword);
        if(!passwordCheckResult) throw new UnauthorizedException();

        var passwordChangeResult = await _userService.ChangePassword(user, command.OldPassword, command.NewPassword);
        if(!passwordChangeResult.Succeeded) throw new Exception(string.Join(",", passwordChangeResult.Errors));

        return Result<Unit>.Success(Unit.Value);
    }
}