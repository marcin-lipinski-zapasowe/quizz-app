using System.Security.Claims;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Auth;

public class UserTypeRequirement : IAuthorizationRequirement
{
    //public ICollection<UserType> userType;
}

public class UserTypeRequirementHandler : AuthorizationHandler<UserTypeRequirement>
{
    private readonly SqlServerQuizDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserTypeRequirementHandler(SqlServerQuizDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserTypeRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        //if (userId == null) return Task.CompletedTask;

        // var user = _context.Users.AsNoTracking().SingleOrDefaultAsync(x => x.Id == userId).Result;
        // if(user == null) return Task.CompletedTask;
        // if(requirement.userType.Contains(user.UserType)) context.Succeed(requirement);

        context.Succeed(requirement);
        return Task.CompletedTask;
    }
}