using Application.Functions.Session.Commands;
using Domain.Entities;

namespace Application.Functions.Session;

public static class SessionMapper
{
    public static LiveSession ProjectToDomain(this SessionNewSessionCommand sessionCommand)
    {
        return new LiveSession
        {
            QuizId = sessionCommand.Quiz.Id,
            OnlyForSigned = sessionCommand.OnlyForSigned,
            QuestionsOnHostScreenOnly = sessionCommand.QuestionsOnHostScreenOnly,
            IsMaxParticipantsNumber = sessionCommand.IsMaxParticipantsNumber,
            GenerateQrCode = sessionCommand.GenerateQrCode,
            SendEmailInvitations = sessionCommand.SendEmailInvitations,
            ShowScoreAfterEveryQuestion = sessionCommand.ShowScoreAfterEveryQuestion,
            ShowScoreAfterAllQuestions = sessionCommand.ShowScoreAfterAllQuestions,
            MaxParticipantsNumber = sessionCommand.IsMaxParticipantsNumber ? sessionCommand.MaxParticipantsNumber : 50,
            EmailsInvitationsList = sessionCommand.EmailsInvitationsList
        };
    }
}