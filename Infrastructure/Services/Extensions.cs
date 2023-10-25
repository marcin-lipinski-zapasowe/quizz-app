using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services;

public static class Extensions
{
    public static IApplicationBuilder UseFilesConfiguration(this WebApplication app, IConfiguration config)
    {
        var filesOptions = app.Services.GetRequiredService<IOptions<FilesOptions>>().Value;
        filesOptions.AppDirectory = new DirectoryInfo(app.Environment.ContentRootPath!).Parent!.Parent!.ToString();
        
        app.UseDirectoryBrowser(new DirectoryBrowserOptions
        {
            FileProvider = new PhysicalFileProvider(filesOptions.ImagesRoute()),
            RequestPath = filesOptions.RequestPath(),
        });
        if (!Directory.Exists(filesOptions.ProfileImagesRoute())) Directory.CreateDirectory(filesOptions.ProfileImagesRoute());
        if (!Directory.Exists(filesOptions.QuizzesImagesRoute())) Directory.CreateDirectory(filesOptions.QuizzesImagesRoute());

        app.UseDefaultFiles();
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(filesOptions.ImagesRoute()),
            RequestPath = filesOptions.RequestPath(),
        });
        
        return app;
    }
}