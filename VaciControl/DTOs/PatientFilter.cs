using System;

namespace VaciControl.DTOs
{
    public class PatientFilter
    {
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string Email { get; set; }
        public bool? Status { get; set; }
    }
}
