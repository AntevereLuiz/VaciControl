using System;
using VaciControl.Models;

namespace VaciControl.DTOs
{
    public class BatchDto
    {
        public Guid? Id { get; set; }
        public string Nome { get; set; }
        public Guid VacinaId { get; set; }
        public Vaccine Vacina { get; set; }
        public Guid FabricanteId { get; set; }
        public Manufacturer Fabricante { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime DataValidade { get; set; }
        public int QtdeFrascos { get; set; }
        public int AplicacoesPorFrasco { get; set; }
        public int TotalAplicacoesPossiveis { get; set; }
    }
}