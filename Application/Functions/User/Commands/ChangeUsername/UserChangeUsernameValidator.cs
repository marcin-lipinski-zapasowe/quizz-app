using FluentValidation;

namespace Application.Functions.User.Commands.ChangeUsername;

public class UserChangeUsernameValidator : AbstractValidator<UserChangeUsernameCommand>
{
    public UserChangeUsernameValidator()
    {
        RuleFor(command => command.NewUsername)
            .NotEmpty().WithMessage("Username is required.");
    }
}