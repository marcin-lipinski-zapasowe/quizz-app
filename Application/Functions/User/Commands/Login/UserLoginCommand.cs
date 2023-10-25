using Application.Core;
using Application.Dto;
using Application.Functions.User.Dto;
using MediatR;

namespace Application.Functions.User.Commands.Login;

public class UserLoginCommand : IRequest<Result<AppUserDto>>
{
    public string EmailOrUsername { get; set; }
    public string Password { get; set; }
}