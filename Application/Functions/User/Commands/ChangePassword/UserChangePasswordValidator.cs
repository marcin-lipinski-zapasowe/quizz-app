using FluentValidation;

namespace Application.Functions.User.Commands.ChangePassword;

public class UserChangePasswordValidator : AbstractValidator<UserChangePasswordCommand>
{
    public UserChangePasswordValidator()
    {
        RuleFor(command => command.NewPassword)
            .MinimumLength(10).WithMessage("The password must be at least 10 characters long.")
            .Must(s => s.Any(ch => !char.IsLetterOrDigit(ch))).WithMessage("The password must contain at least 1 special character.")
            .Must(s => s.Any(char.IsUpper)).WithMessage("The password must contain at least 1 upper letter.")
            .Must(s => s.Count(char.IsNumber) > 3).WithMessage("The password must contain at least 4 numbers.");
        RuleFor(command => command.NewPassword)
            .Equal(command => command.NewPasswordRepeat).WithMessage("Passwords are not the same.");
    }
}