using System;
using VaciControl.Models;

namespace VaciControl.DTOs
{
    public class BatchDto
    {
        public Guid? Id { get; set; }
        //NOME DA VACINA, COMO FAZER?
        //public string Nome { get; set; }
        //public Vaccine Vacina { get; set; }
        public string Lote { get; set; }
        public ManufacturerDto Fabricante { get; set; }
        public int QtdeFrascos { get; set; }
        //ABAIXO É DATETIME?
        public DateTime DataEntrada { get; set; }
        public DateTime DataValidade { get; set; }
        public int AplicacoesPorFrasco { get; set; }
        public int TotalAplicacoesPossiveis { get; set; }
    }
}