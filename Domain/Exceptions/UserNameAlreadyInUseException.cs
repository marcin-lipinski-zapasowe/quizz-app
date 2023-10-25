using System.Net;
using Shared.Exceptions;

namespace Domain.Exceptions;

public class UserNameAlreadyInUseException: CustomException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;
    public UserNameAlreadyInUseException(string username) : base($"User with username {username} already exists.") {}
}