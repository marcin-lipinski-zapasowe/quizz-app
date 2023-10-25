using Application.Core;
using MediatR;

namespace Application.Functions.Session.Commands;

public class SessionNewSessionCommand : IRequest<Result<string>>
{
    public QuizOverview Quiz { get; set; }
    public bool OnlyForSigned { get; set; }
    public bool QuestionsOnHostScreenOnly { get; set; }
    public bool IsMaxParticipantsNumber { get; set; }
    public bool GenerateQrCode { get; set; }
    public bool SendEmailInvitations { get; set; }
    public bool ShowScoreAfterEveryQuestion { get; set; }
    public bool ShowScoreAfterAllQuestions { get; set; }
    public int MaxParticipantsNumber { get; set; }
    public List<string> EmailsInvitationsList { get; set; }
}

public class QuizOverview
{
    public string Id { get; set; }
    public string Title { get; set; }
}