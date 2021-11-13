using System;

namespace VaciControl.Models
{
    public class Batch
    {
        public Guid Id { get; set; }
        //ABAIXO PRECISA LIGAR COM VACINA (É O NOME DA VACINA)
        public string Nome { get; set; }
        //PRECISA MESMO DO ABAIXO?
        //public Vaccine vacina { get; set; }
        public string Lote { get; set; }
        //ABAIXO PRECISA LIGAR COM FABRICANTE
        public Manufacturer Fabricante { get; set; }
        //ABAIXO DEIXA DATETIME?
        public DateTime DataEntrada { get; set; }
        //ABAIXO DEIXA DATETIME?
        public DateTime DataValidade { get; set; }
        public int QtdeFrascos { get; set; }
        public int AplicacoesPorFrasco { get; set; }
        public int TotalAplicacoesPossiveis { get; set; }
    }
}
