using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VaciControl.Models
{
    public class UserAuthenticateResponseViewModel
    {
        public UserAuthenticateResponseViewModel(User user, string token)
        {
            this.user = user;
            this.Token = token;
        }

        public User user { get; set; }
        public string Token { get; set; }
    }
}
