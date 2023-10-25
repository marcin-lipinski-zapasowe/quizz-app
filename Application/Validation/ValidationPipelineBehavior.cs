using FluentValidation;
using MediatR;
using Shared.Exceptions;

namespace Application.Validation;

public class ValidationPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IValidator<TRequest> _validator;

    public ValidationPipelineBehavior(IValidator<TRequest> validator)
    {
        _validator = validator;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (validationResult.IsValid) return await next();
        var errorMessage = string.Join(", ", validationResult.Errors.Select(err => err.ErrorMessage));
        throw new SimpleValidationException(errorMessage);

    }
}