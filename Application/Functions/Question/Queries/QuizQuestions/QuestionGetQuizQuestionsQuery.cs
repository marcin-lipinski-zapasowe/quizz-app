using Application.Core;
using Application.Dto;
using Application.Functions.Question.Dto;
using MediatR;

namespace Application.Functions.Question.Queries.QuizQuestions;

public class QuestionGetQuizQuestionsQuery : IRequest<Result<List<QuestionDto>>>
{
    public string QuizId { get; set; }
}