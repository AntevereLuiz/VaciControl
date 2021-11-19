using System;

namespace VaciControl.DTOs
{
    public class BatchFilter
    {
        public string Nome { get; set; }
        public string Fabricante { get; set; }
        public DateTime? DataValidade { get; set; }
    }
}