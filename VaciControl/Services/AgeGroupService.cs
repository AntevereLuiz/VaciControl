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
    public class AgeGroupService : IAgeGroupService
    {
        private IUnitOfWork _unitOfWork;
        private IAgeGroupRepository _ageGroupRepository;
        private IMapper _mapper;

        public AgeGroupService(IUnitOfWork unitOfWork,
                           IAgeGroupRepository ageGroupRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _ageGroupRepository = ageGroupRepository;
            _mapper = mapper;
        }

        public List<AgeGroupDto> GetAll()
        {
            var allAgeGroups = _ageGroupRepository.GetAll().ToList();
            var allAgeGroupsDto = _mapper.Map<List<AgeGroupDto>>(allAgeGroups);

            return allAgeGroupsDto;
        }

        //public List<AgeGroupDto> GetAllWithConditions(AgeGroupFilter filter)
        //{
        //    var ageGroups = _ageGroupRepository.GetAllWithConditions(x => x.MinAge.Contains(filter.MinAge));
        //    var ageGroupsDto = _mapper.Map<List<AgeGroupDto>>(ageGroups);

        //    return ageGroupsDto;
        //}

        public AgeGroupDto GetById(Guid id)
        {
            var ageGroup = _ageGroupRepository.GetById(x => x.Id == id);
            var ageGroupDto = _mapper.Map<AgeGroupDto>(ageGroup);

            return ageGroupDto;
        }

        public void Insert(AgeGroupDto ageGroupDto)
        {            
            var ageGroup = _mapper.Map<AgeGroup>(ageGroupDto);

            _ageGroupRepository.Insert(ageGroup);
            _unitOfWork.Commit();
        }

        public void Update(AgeGroupDto ageGroupDto)
        {
            var ageGroup = _mapper.Map<AgeGroup>(ageGroupDto);

            _ageGroupRepository.Update(ageGroup);
            _unitOfWork.Commit();
        }

        public void Delete(AgeGroupDto ageGroupDto)
        {            
            var ageGroup = _mapper.Map<AgeGroup>(ageGroupDto);

            _ageGroupRepository.Delete(ageGroup);
            _unitOfWork.Commit();
        }
    }
}
