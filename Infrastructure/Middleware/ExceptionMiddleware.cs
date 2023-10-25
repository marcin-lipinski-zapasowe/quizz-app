using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Shared.Exceptions;

namespace Infrastructure.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(IHostEnvironment env)
    {
        _env = env;
    }
    
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            if(_env.IsDevelopment()) Console.WriteLine(exception);
            var isCustomException = exception.GetType().IsSubclassOf(typeof(CustomException));
        
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = isCustomException ? (int)((CustomException)exception).StatusCode : 500;
            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            var message = isCustomException || _env.IsDevelopment() ? exception.Message : "Internal Server Error";
            var errorCode = exception.GetType().Name;

            var json = _env.IsDevelopment()
                ? JsonSerializer.Serialize(new { ErrorCode = errorCode, Message = message, StackTrace = exception.StackTrace }, options)
                : JsonSerializer.Serialize(new { ErrorCode = errorCode, Message = message }, options);
            
            await context.Response.WriteAsync(json);
        }
    }
}