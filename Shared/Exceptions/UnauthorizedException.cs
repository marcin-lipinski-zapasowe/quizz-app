using System.Net;

namespace Shared.Exceptions;

public class UnauthorizedException : CustomException
{
    public UnauthorizedException() : base("Incorrect credentials")
    { }

    public override HttpStatusCode StatusCode => HttpStatusCode.Unauthorized;
}