using Application.Core;
using Application.Services;
using Domain.Exceptions;
using MediatR;

namespace Application.Functions.User.Commands.ChangeUsername;

public class UserChangeUsernameHandler : IRequestHandler<UserChangeUsernameCommand, Result<Unit>>
{
    private readonly IUserService _userService;

    public UserChangeUsernameHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<Result<Unit>> Handle(UserChangeUsernameCommand command, CancellationToken cancellationToken)
    {
        var checkUsernameAvailability = await _userService.CheckUsernameAvailability(command.NewUsername);
        if (checkUsernameAvailability) throw new UserNameAlreadyInUseException(command.NewUsername);

        var user = await _userService.GetCurrentUser();
        
        user.UserName = command.NewUsername;
        var changeUsernameResult =  await _userService.Update(user);
            
        if(!changeUsernameResult.Succeeded) throw new Exception(string.Join(",", changeUsernameResult.Errors));
            
        return Result<Unit>.Success(Unit.Value);
    }
}