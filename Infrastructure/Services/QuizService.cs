using System.Linq.Expressions;
using Application.Dto;
using Application.Functions.Quiz.Dto;
using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;

namespace Infrastructure.Services;

public class QuizService : Service, IQuizService
{
    public QuizService(SqlServerQuizDbContext dbContext) : base(dbContext)
    {}

    public async Task Create(Quiz quiz)
    {
        await DbContext.AddAsync(quiz);
    }

    public async Task<PagedResult<QuizQuizDto>> GetCreatedAndSavedPaged(string searchPattern, string sortBy, bool sortDesc,
        int pageNumber, string userId)
    {
        var quizzes = DbContext.Quizzes
            .Where(quiz => quiz.AuthorId.Equals(userId) || quiz.AppUsersFavourite.Any(fquiz => fquiz.AppUserId.Equals(userId)))
            .Where(_matchesPattern(searchPattern))
            .Select(_mapToDto(userId));

        quizzes = sortDesc 
            ? quizzes.OrderByDescending(quiz => quiz.Title.ToLower()) 
            : quizzes.OrderBy(quiz => quiz.Title.ToLower());

        return await PagedResult<QuizQuizDto>.CreateAsync(quizzes, pageNumber);
    }

    public async Task<PagedResult<QuizQuizDto>> GetUserSavedPaged(string searchPattern, string sortBy, bool sortDesc,
        int pageNumber, string userId)
    {
        var quizzes = DbContext.Quizzes
            .Where(quiz => quiz.AppUsersFavourite.Any(fquiz => fquiz.AppUserId.Equals(userId)))
            .Where(_matchesPattern(searchPattern))
            .Select(_mapToDto(userId));

        quizzes = sortDesc 
            ? quizzes.OrderByDescending(_sortExpression(sortBy)) 
            : quizzes.OrderBy(_sortExpression(sortBy));

        return await PagedResult<QuizQuizDto>.CreateAsync(quizzes, pageNumber);
    }

    public async Task<PagedResult<QuizQuizDto>> GetUserCreatedPaged(string searchPattern, string sortBy, bool sortDesc,
        int pageNumber, string userId)
    {
        var quizzes = DbContext.Quizzes
            .Where(quiz => quiz.AuthorId.Equals(userId))
            .Where(_matchesPattern(searchPattern))
            .Select(_mapToDto(userId));

        quizzes = sortDesc 
            ? quizzes.OrderByDescending(_sortExpression(sortBy)) 
            : quizzes.OrderBy(_sortExpression(sortBy));
        
        return await PagedResult<QuizQuizDto>.CreateAsync(quizzes, pageNumber);
    }

    public async Task<PagedResult<QuizQuizDto>> GetPublicPaged(string searchPattern, string sortBy, bool sortDesc, int pageNumber, string userId)
    {
        var quizzes = DbContext.Quizzes
            .Where(quiz => quiz.IsPublic)
            .Where(_matchesPattern(searchPattern))
            .Select(_mapToDto(userId));

        quizzes = sortDesc 
            ? quizzes.OrderByDescending(_sortExpression(sortBy)) 
            : quizzes.OrderBy(_sortExpression(sortBy));
        
        return await PagedResult<QuizQuizDto>.CreateAsync(quizzes, pageNumber);
    }

    private static Expression<Func<Quiz, bool>> _matchesPattern(string patter) =>
        quiz => string.IsNullOrWhiteSpace(patter) || quiz.Title.Contains(patter);
    
    private static Expression<Func<Quiz, QuizQuizDto>> _mapToDto(string userId)
    {
        return quiz => new QuizQuizDto
        {
            Id = quiz.QuizId,
            Title = quiz.Title,
            Description = quiz.Description,
            AuthorName = quiz.Author.UserName,
            QuestionsAmount = quiz.Questions.Count,
            AverageOpinion = (float)(quiz.Opinions.Any() ? quiz.Opinions.Average(rate => rate.Value) : 0),
            SessionsAmount = quiz.Sessions.Count,
            IsFavourite = quiz.AppUsersFavourite.Any(favouriteQuiz => favouriteQuiz.AppUserId == userId)
        };
    }

    private static Expression<Func<QuizQuizDto, object>> _sortExpression(string sortBy) =>
        sortBy?.ToLower() switch
        {
            "title" => quiz => quiz.Title,
            "rating" => quiz => quiz.AverageOpinion,
            "sessions" => quiz => quiz.SessionsAmount,
            "questions" => quiz => quiz.QuestionsAmount,
            _ => quiz => quiz.Title
        };
}