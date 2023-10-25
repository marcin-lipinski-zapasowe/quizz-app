using Application.Dto;
using Application.Functions.User.Commands.Login;
using Application.Functions.User.Dto;
using Application.Services;
using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Functions.User;

public static class UserMapper
{
    private static IFilesService _filesService;

    public static void Configure(this IServiceCollection services, IFilesService filesService)
    {
        _filesService = filesService;
    }
    public static AppUserDto ProjectToDto(this AppUser user)
    {
        return new AppUserDto
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.UserName,
            ProfileImageUrl = user.ProfileImage is not null 
                    ? _filesService.CreateProfileImageUrl(user.ProfileImage.RelativePath) 
                    : _filesService.CreateProfileImageUrl("/files/default/default_profileImage.png")
        };
    }
    
    public static AppUser ProjectToDomain(this UserLoginCommand user)
    {
        return new AppUser
        {
            Email = user.EmailOrUsername,
            UserName = user.EmailOrUsername
        };
    }
}