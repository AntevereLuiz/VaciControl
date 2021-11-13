using System;
using System.Collections.Generic;

namespace VaciControl.DTOs
{
    public class CampaignDto
    {
        public Guid? Id { get; set; }
        public string CampaignName { get; set; }
        public DiseaseDto Disease { get; set; }
        public Guid DiseaseId { get; set; }
        public bool? Status { get; set; }
        public List<AgeGroupDto> AgeGroups { get; set; }
    }
}
