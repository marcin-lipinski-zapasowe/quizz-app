using Application.Services;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence;

public static class Extensions
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IFavouriteQuizService, FavouriteQuizService>();
        services.AddScoped<IFilesService, FilesService>();
        services.AddScoped<ILiveSessionService, LiveSessionService>();
        services.AddScoped<IOpinionService, OpinionService>();
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IQuizService, QuizService>();
        services.AddScoped<IUserService, UserService>();
        
        var options = config.GetSection("MSSql").Get<MSSqlOptions>();
        services.AddDbContext<SqlServerQuizDbContext>(ctx => ctx.UseSqlServer(options.ConnectionString));

        return services;
    }
}