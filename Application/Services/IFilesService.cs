using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Services;

public interface IFilesService
{
    
    string CreateProfileImageUrl(string imageRelativePath);

    Task<Image> CreateProfileImage(string username, IFormFile file);
    Task<Image> CreateQuestionImage(string quizId, string questionId, IFormFile image);
}