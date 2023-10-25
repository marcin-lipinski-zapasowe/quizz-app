using System.Net;

namespace Shared.Exceptions;

public class SimpleValidationException : CustomException
{
    public SimpleValidationException(string message) : base(message)
    {
    }

    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;
}