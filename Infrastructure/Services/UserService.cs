using Application.Security;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IUserAccessor _userAccessor;

    public UserService(UserManager<AppUser> userManager, IUserAccessor userAccessor)
    {
        _userManager = userManager;
        _userAccessor = userAccessor;
    }

    public async Task<AppUser> GetCurrentUser()
    {
        return await _userAccessor.GetUser();
    }

    public async Task<bool> CheckPassword(AppUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }

    public Task<IdentityResult> ChangePassword(AppUser user, string oldPassword, string newPassword)
    {
        return _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
    }

    public async Task<IdentityResult> Update(AppUser user)
    {
        return await _userManager.UpdateAsync(user);
    }

    public async Task<bool> CheckUsernameAvailability(string username)
    {
        return await _userManager.Users.AnyAsync(user => user.UserName.Equals(username));
    }

    public async Task<AppUser> GetByUsername(string username)
    {
        return await _userManager.Users
            .Include(user => user.ProfileImage)
            .SingleOrDefaultAsync(user => user.UserName.Equals(username));
    }

    public async Task<AppUser> GetByEmail(string email)
    {
        return await _userManager.Users
            .Include(user => user.ProfileImage)
            .SingleOrDefaultAsync(user => user.Email.Equals(email));
    }

    public async Task<AppUser> GetUserByUsernameEmail(string email, string username)
    {
        var systemUser = await GetByEmail(email);
        systemUser ??= await GetByUsername(username);

        return systemUser;
    }

    public async Task<IdentityResult> Create(AppUser user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }

    public async Task<AppUser> GetById(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }
}