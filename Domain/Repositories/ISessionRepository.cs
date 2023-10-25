using Domain.Entities;

namespace Domain.Repositories;

public interface ISessionRepository
{
    Task Create(LiveSession session);
    IQueryable<string> GetLiveSessionsPins();
    Task SetHostConnectionId(string sessionPin, string connectionId);
    Task AddParticipant(string sessionPin, Participant participant);
    Task<LiveSession> GetSession(string sessionPin);
}