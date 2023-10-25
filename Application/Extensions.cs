using Application.Functions.Question;
using Application.Functions.Quiz;
using Application.Functions.User;
using Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Extensions
{
    public static IServiceCollection AddMapping(this IServiceCollection services)
    {
        services.AddSessionService();
        var filesService = services.BuildServiceProvider().GetService<IFilesService>();
        services.Configure(filesService);
        services.ConfigureQuestions(filesService);
        
        return services;
    }
}