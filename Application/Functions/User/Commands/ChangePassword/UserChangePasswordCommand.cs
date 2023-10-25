using Application.Core;
using MediatR;

namespace Application.Functions.User.Commands.ChangePassword;

public class UserChangePasswordCommand : IRequest<Result<Unit>>
{
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
    public string NewPasswordRepeat { get; set; }
}