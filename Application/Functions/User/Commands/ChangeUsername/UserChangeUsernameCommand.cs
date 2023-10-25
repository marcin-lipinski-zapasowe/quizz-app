using Application.Core;
using MediatR;

namespace Application.Functions.User.Commands.ChangeUsername;

public class UserChangeUsernameCommand : IRequest<Result<Unit>>
{
    public string NewUsername { get; set; }
}