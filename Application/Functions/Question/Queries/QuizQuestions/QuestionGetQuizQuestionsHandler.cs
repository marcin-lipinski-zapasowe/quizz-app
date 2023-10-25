using System.Linq.Expressions;
using Application.Core;
using Application.Functions.Question.Dto;
using Application.Functions.Quiz;
using Application.Services;
using MediatR;

namespace Application.Functions.Question.Queries.QuizQuestions;

public class QuestionGetQuizQuestionsHandler : IRequestHandler<QuestionGetQuizQuestionsQuery, Result<List<QuestionDto>>>
{
    private readonly IQuestionService _questionService;

    public QuestionGetQuizQuestionsHandler(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    public async Task<Result<List<QuestionDto>>> Handle(QuestionGetQuizQuestionsQuery query, CancellationToken cancellationToken)
    {
        var questionsList = await _questionService.GetQuestionsByQuizProjected(query.QuizId, _predicate);

        return Result<List<QuestionDto>>.Success(questionsList);
    }

    private readonly Expression<Func<Domain.Entities.Question, QuestionDto>> _predicate = question =>
        question.ProjectToDto();
}