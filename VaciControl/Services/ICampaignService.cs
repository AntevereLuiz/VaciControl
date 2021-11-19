using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Services
{
    public interface ICampaignService
    {
        List<CampaignDto> GetAll();
        CampaignDto GetById(Guid id);        
        void Insert(CampaignDto campaign);
        void Update(CampaignDto campaign);
        void Delete(CampaignDto campaign);
        List<CampaignDto> GetAllWithConditions(CampaignFilter filter);
    }
}