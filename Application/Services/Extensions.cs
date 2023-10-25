using Application.Functions.Session.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Services;

public static class Extensions
{
    public static void AddSessionService(this IServiceCollection services)
    {
        services.AddScoped<LiveSessionManager>();
    }
}