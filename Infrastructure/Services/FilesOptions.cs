using System.Text.Json.Serialization;

namespace Infrastructure.Services;

public class FilesOptions
{
    public string AppDirectory { get; set; }
    public string ImagesRoute() => Path.Combine(AppDirectory, FilesDirectory);
    
    public string ProfileImagesRoute() => Path.Combine(AppDirectory, ProfileImagesDirectory);
    
    public string QuizzesImagesRoute() => Path.Combine(AppDirectory, QuizzesImagesDirectory);
    public string RequestPath() => Path.Combine("/", FilesDirectory);
    public string FilesDirectory { get; set; }
    public string ProfileImagesDirectory { get; set; }
    public string QuizzesImagesDirectory { get; set; }
}