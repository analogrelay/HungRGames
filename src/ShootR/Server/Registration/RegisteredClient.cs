namespace ShootR
{
    public class RegisteredClient
    {
        public RegisteredClient(string registrationID, string identity, string displayName, string photo)
        {
            RegistrationID = registrationID;
            Identity = identity;
            DisplayName = displayName;
            Photo = photo;

            //_initialized = DateTime.UtcNow;
        }

        public string RegistrationID { get; set; }
        public string Identity { get; set; }
        public string DisplayName { get; set; }
        public string Photo { get; set; }
    }
}