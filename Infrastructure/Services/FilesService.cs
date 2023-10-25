using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services;

public class FilesService : Service, IFilesService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IOptions<FilesOptions> _filesOptions;

    public FilesService(IHttpContextAccessor httpContextAccessor, IOptions<FilesOptions> filesOptions, SqlServerQuizDbContext dbContext) : base(dbContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _filesOptions = filesOptions;
    }
    
    public string CreateProfileImageUrl(string imageRelativePath)
    {
        var scheme = _httpContextAccessor.HttpContext!.Request.Scheme;
        var host = _httpContextAccessor.HttpContext.Request.Host;
        var pathBase = _httpContextAccessor.HttpContext.Request.PathBase;
        return string.Concat(scheme, "://", host, pathBase, imageRelativePath);
    }

    private static string CreateImageName(string toBeHashed, IFormFile file) 
        => (toBeHashed + DateTime.Now).GetHashCode() + "." + file.ContentType.Split("/")[1];

    private async Task SaveImageAndAddToDb(Image image, IFormFile file)
    {
        await using var fileStream = new FileStream(image.FullPath, FileMode.Create);
        await file.CopyToAsync(fileStream);
        await DbContext.Images.AddAsync(image);
        await DbContext.SaveChangesAsync();
    }
    
    public async Task<Image> CreateProfileImage(string username, IFormFile file)
    {
        var imageName = CreateImageName(username, file);
        var image = new Image
        {
            ImageId = Guid.NewGuid().ToString(),
            FullPath = Path.Combine(_filesOptions.Value.ProfileImagesRoute(), imageName),
            RelativePath = Path.Combine("/", _filesOptions.Value.ProfileImagesDirectory, imageName)
        };

        await SaveImageAndAddToDb(image, file);
        return image;
    }

    public async Task<Image> CreateQuestionImage(string quizId, string questionId, IFormFile file)
    {
        var imageName = CreateImageName(questionId, file);
        var dirPath = Path.Combine(_filesOptions.Value.QuizzesImagesRoute(), quizId);
        if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);
        
        var image = new Image
        {
            ImageId = Guid.NewGuid().ToString(),
            FullPath = Path.Combine(dirPath, imageName),
            RelativePath = Path.Combine("/", _filesOptions.Value.QuizzesImagesDirectory, quizId, imageName)
        };
        
        await SaveImageAndAddToDb(image, file);
        return image;
    }
}