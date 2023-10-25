using FluentValidation;

namespace Application.Functions.User.Commands.Login;

public class UserLoginValidator : AbstractValidator<UserLoginCommand>
{
    public UserLoginValidator()
    {
        RuleFor(command => command.EmailOrUsername)
            .NotEmpty().Unless(command => !string.IsNullOrEmpty(command.EmailOrUsername))
            .WithMessage("Email/Username is required.");
    }
}