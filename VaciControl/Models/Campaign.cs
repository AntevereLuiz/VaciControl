using System;
using System.Collections.Generic;

namespace VaciControl.Models
{
    public class Campaign 
    {
        public Guid Id { get; set; }
        public string CampaignName { get; set; }
        public Disease Disease { get; set; }
        public Guid DiseaseId { get; set; }
        public bool Status { get; set; }
        public List<AgeGroup> AgeGroups { get; set; }
    }
}
