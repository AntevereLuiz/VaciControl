using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VaciControl.Models
{
    public class UserAuthenticateRequestViewModel
    {
        public string CPF { get; set; }
        public string Password { get; set; }
    }
}
