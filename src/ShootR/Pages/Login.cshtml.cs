using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ShootR.Pages
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        public async Task<IActionResult> OnPostAsync(string name, string role)
        {
            await LoginHelper.SignInAsync(HttpContext, name, role);
            return Redirect("/");
        }
    }
}
