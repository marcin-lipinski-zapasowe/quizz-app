namespace Domain.Entities;

public class LiveSession
{
    public string LiveSessionId { get; set; }
    public string SessionPin { get; set; }
    public AppUser Host { get; set; }
    public string HostId { get; set; }
    public string HostConnectionId { get; set; }
    public List<Participant> Participants { get; set; }
    public Quiz Quiz { get; set; }
    public string QuizId { get; set; }
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

public class Participant
{
    public AppUser AppUser { get; set; }
    public string AppUserId { get; set; }
    public string ParticipantId { get; set; }
    public string ConnectionId { get; set; }
    public string Username { get; set; }
    public double Score { get; set; }
}