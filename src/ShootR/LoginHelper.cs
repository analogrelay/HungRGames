using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace ShootR
{
    public static class LoginHelper
    {
        public static readonly string PlayerRole = "Player";
        public static readonly string SpectatorRole = "Spectator";

        public static async Task SignInAsync(HttpContext context, string name, string role, string photoUrl)
        {
            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            identity.AddClaim(new Claim(ClaimTypes.Name, name));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, $"User_{name}_{Guid.NewGuid():N}"));
            identity.AddClaim(new Claim(ClaimTypes.Role, role));

            if (!string.IsNullOrEmpty(photoUrl))
            {
                identity.AddClaim(new Claim("photo", photoUrl));
            }

            await context.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity));
        }
    }
}