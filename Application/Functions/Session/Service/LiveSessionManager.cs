using Application.Services;
using Domain.Entities;
using Shared.Exceptions.Session;

namespace Application.Functions.Session.Service;

public class LiveSessionManager
{
    private readonly ILiveSessionService _liveSessionService;
    private readonly IUserService _userService;

    public LiveSessionManager(ILiveSessionService liveSessionService, IUserService userService)
    {
        _liveSessionService = liveSessionService;
        _userService = userService;
    }

    private async Task<string> GenerateUniquePin()
    {
        var attempts = 10;
        var takenPins = await _liveSessionService.GetOccupiedPins();
        do
        {
            var pin = Random.Shared.Next(0, 999999).ToString();
            var normalized = pin.PadLeft(6, '0');
            if (!takenPins.Contains(normalized)) return "pin" + normalized;

        } while (attempts-- != 0);

        throw new Exception("Retry");
    }
    
    public async Task<string> CreateNewSession(LiveSession session)
    {
        session.LiveSessionId = Guid.NewGuid().ToString();
        session.SessionPin = await GenerateUniquePin();
        await _liveSessionService.Create(session);
        await _liveSessionService.SaveAsync();

        return session.SessionPin;
    }

    public async Task SetHostConnectionId(string sessionPin, string connectionId)
    {
        await _liveSessionService.SetHostConnectionId(sessionPin, connectionId);
        await _liveSessionService.SaveAsync();
    }
    
    public async Task AddParticipant(string sessionPin, ParticipantDto participant)
    {
        var session = await _liveSessionService.GetSessionByPin(sessionPin);
        
        if (session.Participants.Count == session.MaxParticipantsNumber) throw new MaxParticipantNumberExceeded();
        if (string.IsNullOrWhiteSpace(participant.Id) && session.OnlyForSigned) throw new OnlyForSignedException();

        var domainParticipant = new Participant();
        AppUser user = null;

        if (participant.Id != null) user = await _userService.GetById(participant.Id);

        if (user != null)
        {
            domainParticipant.AppUser = user;
        }

        domainParticipant.Username = participant.Username;
        domainParticipant.Score = 0.0;
        domainParticipant.ParticipantId = Guid.NewGuid().ToString();
        
        session.Participants.Add(domainParticipant);
        _liveSessionService.Update(session);
        await _liveSessionService.SaveAsync();
    }
}