using System;

namespace VaciControl.DTOs
{
    public class UserDto
    {
        public Guid? Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public bool? Status { get; set; }
        public string Password { get; set; }
    }
}
