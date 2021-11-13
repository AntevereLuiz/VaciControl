using System;

namespace VaciControl.Models
{
    public class Vaccine
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public int IntervaloProximaDose { get; set; }
        public Guid DiseaseId { get; set; }
        public Disease Disease { get; set; }
    }
}
