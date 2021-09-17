using System;

namespace VaciControl.Models
{
    public class Manufacturer /* Definindo propriedades */
    {       
        public Guid Id { get; set; }

        public string Nome { get; set; }

        public string Cnpj { get; set; }

        public string Email { get; set; }

    }
}
