using FluentValidation;

namespace Application.Functions.Session.Commands;

public class SessionNewSessionValidator : AbstractValidator<SessionNewSessionCommand>
{
    public SessionNewSessionValidator()
    {
    }
}