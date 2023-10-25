using System.Text;
using Application.Security;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth;

public static class Extensions
{
    public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration config)
    {
        var options = config.GetSection("Auth").Get<AuthOptions>();

        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
            opt.Password.RequireNonAlphanumeric = true;
            opt.Password.RequireDigit = true;
            opt.Password.RequiredLength = 8;
            opt.Password.RequireUppercase = true;
        })
        .AddEntityFrameworkStores<SqlServerQuizDbContext>();
        
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(token =>
        {
            token.TokenValidationParameters = new TokenValidationParameters
            {
                //ValidIssuer = options.Issuer,
                //ValidAudience = options.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Key)),
                ValidateIssuer = false,
                ValidateAudience = false,
                //ValidateLifetime = true,
                ValidateIssuerSigningKey = true
            };
        });
        
        services.AddAuthorization(opt =>
        {
        });
        
        //services.AddTransient<IAuthorizationHandler, UserTypeRequirementHandler>();
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}