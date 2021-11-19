using System;

namespace VaciControl.DTOs
{
    public class AgeGroupDto
    {
        public Guid? Id { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public DateTime DateIni { get; set; }
        public DateTime DateFim { get; set; }
        public Guid CampaignId { get; set; }
    }
}
