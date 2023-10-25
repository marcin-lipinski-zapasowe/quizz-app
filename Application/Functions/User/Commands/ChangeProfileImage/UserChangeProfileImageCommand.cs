using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Functions.User.Commands.ChangeProfileImage;

public class UserChangeProfileImageCommand : IRequest<Result<string>>
{
    public IFormFile File { get; set; }
}