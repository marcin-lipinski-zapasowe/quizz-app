using System.Net;
using Shared.Exceptions;

namespace Domain.Exceptions;

public class EmailAlreadyInUseException : CustomException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;
    public EmailAlreadyInUseException(string email) : base($"User with email {email} already exists.") {}
}