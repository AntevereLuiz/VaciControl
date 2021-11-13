using System;

namespace VaciControl.DTOs
{
    public class VaccineDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public Guid DiseaseId { get; set; }
        public DiseaseDto Disease { get; set; }
        public int Amount { get; set; }
        public int IntervaloProximaDose { get; set; }
    }
}
