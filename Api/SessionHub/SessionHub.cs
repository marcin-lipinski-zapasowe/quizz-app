using System.Text.Json;
using Application.Functions.Session.Service;
using Microsoft.AspNetCore.SignalR;
using Shared.Exceptions.Session;

namespace Api.SessionHub;

public class SessionHub : Hub
{
    private readonly LiveSessionManager _liveSessionManager;

    public SessionHub(LiveSessionManager liveSessionManager)
    {
        _liveSessionManager = liveSessionManager;
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }

    public async Task ParticipantJoinSession(string sessionPin, ParticipantDto participant)
    {
        try
        {
            await _liveSessionManager.AddParticipant(sessionPin, participant);
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionPin);
            await Clients.Group(sessionPin).SendAsync("ParticipantJoined", participant.Username, 0.0);
        }
        catch (MaxParticipantNumberExceeded)
        {
            await Clients.Caller.SendAsync("ParticipantJoinedErrorMaxNumber", " ");
        }
        catch (OnlyForSignedException)
        {
            await Clients.Caller.SendAsync("ParticipantJoinedErrorOnlyForSigned", " ");
        }
    }
    
    public async Task HostJoinSession(string sessionPin)
    {
        Console.WriteLine(JsonSerializer.Serialize(sessionPin));
        await _liveSessionManager.SetHostConnectionId(sessionPin, Context.ConnectionId);
        await Groups.AddToGroupAsync(Context.ConnectionId, sessionPin);
    }
}