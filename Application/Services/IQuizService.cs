#nullable enable
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Domain.Entities;

namespace Application.Services;

public interface IQuizService : IService
{
    Task Create(Quiz quiz);
    Task<PagedResult<QuizQuizDto>> GetCreatedAndSavedPaged(string searchPattern, string? sortBy, bool sortDesc, int pageNumber, string userId);

    Task<PagedResult<QuizQuizDto>> GetPublicPaged(string searchPattern, string? sortBy, bool sortDesc, int pageNumber, string userId);

    Task<PagedResult<QuizQuizDto>> GetUserCreatedPaged(string searchPattern, string sortBy, bool sortDesc,
        int pageNumber, string userId);

    Task<PagedResult<QuizQuizDto>> GetUserSavedPaged(string searchPattern, string sortBy, bool sortDesc,
        int pageNumber, string userId);
}