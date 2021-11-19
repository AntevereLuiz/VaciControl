using System;

namespace VaciControl.Models
{
    public class AgeGroup 
    {        
        public Guid Id { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public DateTime DateIni { get; set; }
        public DateTime DateFim { get; set; }
        public Guid CampaignId { get; set; }
    }
}