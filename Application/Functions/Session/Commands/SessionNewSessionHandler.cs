using Application.Core;
using Application.Functions.Session.Service;
using Application.Services;
using MediatR;

namespace Application.Functions.Session.Commands;

public class SessionNewSessionHandler : IRequestHandler<SessionNewSessionCommand, Result<string>>
{
    private readonly IUserService _userService;
    private readonly LiveSessionManager _liveSessionManager;

    public SessionNewSessionHandler(LiveSessionManager liveSessionManager, IUserService userService)
    {
        _liveSessionManager = liveSessionManager;
        _userService = userService;
    }

    public async Task<Result<string>> Handle(SessionNewSessionCommand request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetCurrentUser();
        var session = request.ProjectToDomain();
        session.Host = user;
        session.HostId = user.Id;
        var pin = await _liveSessionManager.CreateNewSession(session);

        return Result<string>.Success(pin);
    }
}