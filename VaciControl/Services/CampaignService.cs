using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;
using VaciControl.UoW;
namespace VaciControl.Services
{
    public class CampaignService : ICampaignService
    {
        private IUnitOfWork _unitOfWork;
        private ICampaignRepository _campaignRepository;
        private IAgeGroupRepository _ageGroupRepository;
        private IMapper _mapper;

        public CampaignService(IUnitOfWork unitOfWork,
                           ICampaignRepository campaignRepository,
                           IAgeGroupRepository ageGroupRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _campaignRepository = campaignRepository;
            _ageGroupRepository = ageGroupRepository;
            _mapper = mapper;            
        }

        public List<CampaignDto> GetAll()
        {
            var allCampaigns = _campaignRepository.GetAll().ToList();
            var allCampaignsDto = _mapper.Map<List<CampaignDto>>(allCampaigns);

            return allCampaignsDto;
        }

        public List<CampaignDto> GetAllWithConditions(CampaignFilter filter)
        {
            var campaigns = _campaignRepository.GetAll().Where(x => x.CampaignName.Contains(filter.CampaignName) &&                                                                    
                                                                  x.Disease.Nome.Contains(filter.Disease) &&
                                                                  (filter.Status == null || x.Status == filter.Status.Value))
                                               .Include(x => x.Disease).ToList();

            var campaignsdto = _mapper.Map<List<CampaignDto>>(campaigns);            

            return campaignsdto;
        }

        public CampaignDto GetById(Guid id)
        {
            var campaign = _campaignRepository.GetById(x => x.Id == id).Include(x => x.AgeGroups).Include(x => x.Disease).FirstOrDefault();
            var campaignDto = _mapper.Map<CampaignDto>(campaign);

            return campaignDto;
        }

        public void Insert(CampaignDto campaignDto)
        {
            campaignDto.Status = true;
            var campaign = _mapper.Map<Campaign>(campaignDto);

            _campaignRepository.Insert(campaign);

            foreach (var ageGroupitem in campaign.AgeGroups)
            {
                _ageGroupRepository.Insert(ageGroupitem);
            }

            _unitOfWork.Commit();
        }

        public void Update(CampaignDto campaignDto)
        {                                               
            var campaignMap = _mapper.Map<Campaign>(campaignDto);

            var array = _ageGroupRepository.GetAll().Where(x => x.CampaignId == campaignDto.Id).ToList();

            foreach (var item in array)
            {
                if (campaignMap.AgeGroups.FirstOrDefault(x => x.Id == item.Id) == null)
                {
                    _ageGroupRepository.Delete(item);
                }
            }

            _campaignRepository.Update(campaignMap);

            _unitOfWork.Commit();
        }

        public void Delete(CampaignDto campaignDto)
        {
            campaignDto.Status = false;
            var campaign = _mapper.Map<Campaign>(campaignDto);

            _campaignRepository.Update(campaign);
            _unitOfWork.Commit();
        }
    }
}
