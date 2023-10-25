using System.Net;

namespace Shared.Exceptions;

public class NoSuchUserException : CustomException
{
    public NoSuchUserException() : base("No user with given email/username.")
    {}

    public override HttpStatusCode StatusCode => HttpStatusCode.NotFound;
}