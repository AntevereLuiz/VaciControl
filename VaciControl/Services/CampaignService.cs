using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        //public list<campaigndto> getallwithconditions(campaignfilter filter)
        //{
        //    var campaigns = _campaignrepository.getallwithconditions(x => x.campaignname.contains(filter.campaignname) &&
        //                                                          (filter.status == null || x.status == filter.status.value));
        //    var campaignsdto = _mapper.map<list<campaigndto>>(campaigns);

        //    return campaignsdto;
        //}

        public CampaignDto GetById(Guid id)
        {
            var campaign = _campaignRepository.GetById(x => x.Id == id);
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
            var campaign = _mapper.Map<Campaign>(campaignDto);

            _campaignRepository.Update(campaign);

            foreach (var ageGroupitem in campaign.AgeGroups)
            {
                _ageGroupRepository.Update(ageGroupitem);
            }

            _unitOfWork.Commit();
        }

        public void Delete(CampaignDto campaignDto)
        {
            campaignDto.Status = false;
            var campaign = _mapper.Map<Campaign>(campaignDto);

            _campaignRepository.Delete(campaign);
            _unitOfWork.Commit();
        }
    }
}
