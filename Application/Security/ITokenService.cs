using Domain.Entities;

namespace Application.Security;

public interface ITokenService
{
    public string CreateToken(AppUser appUser);
}