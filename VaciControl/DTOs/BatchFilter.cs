using System;

namespace VaciControl.DTOs
{
    public class BatchFilter
    {
        //NOME DA VACINA? QUE NOME É ESSE? SE FOR DA VACINA É TIPO VACCINE OU TIPO STRING?
        public string Nome { get; set; }
        //ABAIXO É STRING OU FABRICANTE O TIPO?
        public string Fabricante { get; set; }
        public DateTime? DataValidade { get; set; }
    }
}