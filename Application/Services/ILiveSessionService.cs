using Domain.Entities;

namespace Application.Services;

public interface ILiveSessionService : IService
{
    Task SetHostConnectionId(string sessionPin, string connectionId);

    Task<List<string>> GetOccupiedPins();
    Task Create(LiveSession session);
    Task<LiveSession> GetSessionByPin(string liveSessionPin);
    void Update(LiveSession session);
}