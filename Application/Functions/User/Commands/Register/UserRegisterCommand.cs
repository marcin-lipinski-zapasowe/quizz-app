using Application.Core;
using Application.Dto;
using Application.Functions.User.Dto;
using MediatR;

namespace Application.Functions.User.Commands.Register;

public class UserRegisterCommand : IRequest<Result<AppUserDto>>
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string PasswordRepeat { get; set; }
}