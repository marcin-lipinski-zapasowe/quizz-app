using Application.Functions.Quiz.Commands.Create;
using Application.Services;
using Domain.Entities.QuestionsType;
using Microsoft.Extensions.DependencyInjection;
using Shared.Enums;
using static System.Enum;
using QuestionOpenContract = Application.Functions.Question.Dto.QuestionOpenContract;

namespace Application.Functions.Quiz;

public static class Quizzes
{
    private static IFilesService _filesService;

    public static void ConfigureQuestions(this IServiceCollection services, IFilesService filesService)
    {
        _filesService = filesService;
    }
    public static Domain.Entities.Quiz ProjectToDomain(this QuizCreateCommand quizCreateCommand)
    {
        var quiz = new Domain.Entities.Quiz
        {
            QuizId = quizCreateCommand.Id,
            Title = quizCreateCommand.General.Title,
            Description = quizCreateCommand.General.Description,
            IsPublic = quizCreateCommand.General.IsPublic,
            Sessions = new List<Domain.Entities.LiveSession>(),
            Opinions = new List<Domain.Entities.Opinion>()
        };
        quiz.Questions = quizCreateCommand.Questions
                                .Select(question => question.ProjectToDomain(quiz))
                                .OrderBy(question => question.Number)
                                .ToList();

        return quiz;
    }

    private static Domain.Entities.Question ProjectToDomain(this QuestionContract commandQuestion, Domain.Entities.Quiz quiz)
    {
        Domain.Entities.Question domainQuestion = commandQuestion.Type switch
        {
            (int)QuestionType.TrueFalse => new QuestionTrueFalse
                {
                    CorrectAnswer = ((QuestionTrueFalseContract)commandQuestion).CorrectAnswer
                },
            (int)QuestionType.Selection => new QuestionSelection
                {
                    CorrectAnswers = SelectionCorrectAnswerToInt(((QuestionSelectionContract)commandQuestion).CorrectAnswers),
                    AnswerA = ((QuestionSelectionContract)commandQuestion).AnswerA,
                    AnswerB = ((QuestionSelectionContract)commandQuestion).AnswerB,
                    AnswerC = ((QuestionSelectionContract)commandQuestion).AnswerC,
                    AnswerD = ((QuestionSelectionContract)commandQuestion).AnswerD,
                },
            (int)QuestionType.Rating => new QuestionRating
                {
                    Min = ((QuestionRatingContract)commandQuestion).Min,
                    Max = ((QuestionRatingContract)commandQuestion).Max,
                    Step = ((QuestionRatingContract)commandQuestion).Step,
                },
            _ => new QuestionOpen()
        };

        domainQuestion.QuestionId = commandQuestion.Id;
        domainQuestion.Type = (QuestionType)commandQuestion.Type;
        domainQuestion.Content = commandQuestion.Content;
        domainQuestion.Title = commandQuestion.Title;
        domainQuestion.Number = commandQuestion.Number;
        domainQuestion.QuizId = quiz.QuizId;
        domainQuestion.Quiz = quiz;

        return domainQuestion;
    }

    public static Question.Dto.QuestionDto ProjectToDto(this Domain.Entities.Question domainQuestion)
    {
        Question.Dto.QuestionDto dtoQuestion = domainQuestion.Type switch
        {
            QuestionType.TrueFalse => new Question.Dto.QuestionTrueFalseContract
            {
                CorrectAnswer = ((QuestionTrueFalse)domainQuestion).CorrectAnswer
            },
            QuestionType.Selection => new Question.Dto.QuestionSelectionContract
            {
                CorrectAnswers = ((QuestionSelection)domainQuestion).CorrectAnswers,
                AnswerA = ((QuestionSelection)domainQuestion).AnswerA,
                AnswerB = ((QuestionSelection)domainQuestion).AnswerB,
                AnswerC = ((QuestionSelection)domainQuestion).AnswerC,
                AnswerD = ((QuestionSelection)domainQuestion).AnswerD,
            },
            QuestionType.Rating => new Question.Dto.QuestionRatingContract
            {
                Min = ((QuestionRating)domainQuestion).Min,
                Max = ((QuestionRating)domainQuestion).Max,
                Step = ((QuestionRating)domainQuestion).Step,
            },
            _ => new QuestionOpenContract()
        };

        dtoQuestion.Id = domainQuestion.QuestionId;
        dtoQuestion.Type = domainQuestion.Type;
        dtoQuestion.Content = domainQuestion.Content;
        dtoQuestion.Title = domainQuestion.Title;
        dtoQuestion.Number = domainQuestion.Number;
        dtoQuestion.QuestionImageUrl = domainQuestion.Image is not null
            ? _filesService.CreateProfileImageUrl(domainQuestion.Image.RelativePath)
            : null;

        return dtoQuestion;
    }

    private static SelectionCorrectAnswers SelectionCorrectAnswerToInt(string str)
    {
        return (SelectionCorrectAnswers)Parse(typeof(SelectionCorrectAnswers), str);
    }
}