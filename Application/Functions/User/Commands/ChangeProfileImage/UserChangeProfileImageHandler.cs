using Application.Core;
using Application.Services;
using MediatR;

namespace Application.Functions.User.Commands.ChangeProfileImage;

public class UserChangeProfileImageHandler: IRequestHandler<UserChangeProfileImageCommand, Result<string>>
{
    private readonly IUserService _userService;
    private readonly IFilesService _filesService;

    public UserChangeProfileImageHandler(IFilesService filesService, IUserService userService)
    {
        _filesService = filesService;
        _userService = userService;
    }

    public async Task<Result<string>> Handle(UserChangeProfileImageCommand command, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        var image = await _filesService.CreateProfileImage(user.UserName, command.File);
        
        user.ProfileImage = image;
        var changeProfileImageResult = await _userService.Update(user);
        if(!changeProfileImageResult.Succeeded) throw new Exception(string.Join(",", changeProfileImageResult.Errors));

        var imageUrl = _filesService.CreateProfileImageUrl(image.RelativePath);
        return Result<string>.Success(imageUrl);
    }
}