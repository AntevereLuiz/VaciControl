using System;

namespace VaciControl.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
    }
}
