using Application.Core;
using Application.Functions.User.Dto;
using MediatR;

namespace Application.Functions.User.Queries.CurrentUser;

public class UserGetCurrentUserQuery: IRequest<Result<AppUserDto>>
{}