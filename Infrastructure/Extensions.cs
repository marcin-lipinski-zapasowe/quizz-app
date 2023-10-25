using Application.Services;
using Infrastructure.Auth;
using Infrastructure.Middleware;
using Infrastructure.Persistence;
using Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IFilesService, FilesService>();
        services.AddScoped<ExceptionMiddleware>();
        services.AddPersistence(config);
        services.AddAuth(config);

        return services;
    }

    public static IApplicationBuilder UseInfrastructure(this WebApplication app, IConfiguration config)
    {
        app.UseFilesConfiguration(config);
        app.UseMiddleware<ExceptionMiddleware>();

        return app;
    }
}