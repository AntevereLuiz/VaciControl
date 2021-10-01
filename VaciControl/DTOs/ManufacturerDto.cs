using System;

namespace VaciControl.DTOs
{
    public class ManufacturerDto
    {
        public Guid? Id { get; set; }

        public string Nome { get; set; }

        public string Cnpj { get; set; }

        public string Email { get; set; }
    }
}
