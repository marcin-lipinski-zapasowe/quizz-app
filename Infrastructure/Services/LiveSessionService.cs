using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class LiveSessionService : ILiveSessionService
{
    private readonly SqlServerQuizDbContext _dbContext;
    
    public LiveSessionService(SqlServerQuizDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task SetHostConnectionId(string sessionPin, string connectionId)
    {
        var session = await _dbContext.Sessions
            .SingleOrDefaultAsync(session => session.SessionPin.Equals(sessionPin));
        session.HostConnectionId = connectionId;
        _dbContext.Sessions.Update(session);
    }

    public async Task<List<string>> GetOccupiedPins()
    {
        return await _dbContext.Sessions.Select(session => session.SessionPin).ToListAsync();
    }
    
    public async Task Create(LiveSession session)
    {
        await _dbContext.Sessions.AddAsync(session);
    }

    public async Task<LiveSession> GetSessionByPin(string liveSessionPin)
    {
        return await _dbContext.Sessions
            .Include(session => session.Participants)
            .SingleOrDefaultAsync(session => session.SessionPin.Equals(liveSessionPin));
    }

    public void Update(LiveSession session)
    {
        _dbContext.Sessions.Update(session);
    }

    public async Task SaveAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}