using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public interface IUserService
{
    Task<AppUser> GetCurrentUser();
    Task<bool> CheckPassword(AppUser user, string password);

    Task<IdentityResult> ChangePassword(AppUser user, string oldPassword, string newPassword);
    Task<IdentityResult> Update(AppUser user);

    Task<bool> CheckUsernameAvailability(string username);
    Task<AppUser> GetByUsername(string username);
    Task<AppUser> GetByEmail(string email);
    Task<AppUser> GetUserByUsernameEmail(string email, string username);

    Task<IdentityResult> Create(AppUser user, string password);
    Task<AppUser> GetById(string userId);
}