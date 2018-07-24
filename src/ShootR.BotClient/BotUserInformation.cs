using System;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.WebUtilities;

namespace ShootR.BotClient
{
    public sealed class BotUserInformation
    {
        private static string DefaultBotPhoto = null;

        public BotUserInformation(string displayName) : this(displayName, DefaultBotPhoto)
        {
        }

        public BotUserInformation(string displayName, string photoUrl)
        {
            DisplayName = displayName;
            Photo = photoUrl;
        }

        public string DisplayName { get; }

        public string Photo { get; }
    }
}
