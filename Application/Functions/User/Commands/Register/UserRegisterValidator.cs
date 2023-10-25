using FluentValidation;

namespace Application.Functions.User.Commands.Register;

public class UserRegisterValidator : AbstractValidator<UserRegisterCommand>
{
    public UserRegisterValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email address.");
        RuleFor(command => command.UserName)
            .NotEmpty().WithMessage("Username is required.");
        RuleFor(command => command.Password)
            .MinimumLength(10).WithMessage("The password must be at least 10 characters long.")
            .Must(s => s.Any(ch => !char.IsLetterOrDigit(ch))).WithMessage("The password must contain at least 1 special character.")
            .Must(s => s.Any(char.IsUpper)).WithMessage("The password must contain at least 1 upper letter.")
            .Must(s => s.Count(char.IsNumber) > 3).WithMessage("The password must contain at least 4 numbers.");
        RuleFor(command => command.PasswordRepeat)
            .Equal(command => command.Password).WithMessage("Passwords are not the same.");
    }
}