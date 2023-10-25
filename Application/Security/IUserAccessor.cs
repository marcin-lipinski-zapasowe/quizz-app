using Domain.Entities;

namespace Application.Security;

public interface IUserAccessor
{
    string GetUsername();
    Task<AppUser> GetUser();
}