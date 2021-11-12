using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;
using VaciControl.UoW;

namespace VaciControl.Services
{
    public class DiseaseService : IDiseaseService
    {
        private IUnitOfWork _unitOfWork;
        private IDiseaseRepository _diseaseRepository;
        private IMapper _mapper;

        public DiseaseService(IUnitOfWork unitOfWork,
                           IDiseaseRepository userRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _diseaseRepository = userRepository;
            _mapper = mapper;
        }

        public List<DiseaseDto> GetAllWithConditions(DiseaseFilter filter)
        {
            var diseases = _diseaseRepository.GetAllWithConditions(x => x.Nome.Contains(filter.Nome));

            var diseasesDto = _mapper.Map<List<DiseaseDto>>(diseases);

            return diseasesDto;
        }

        public DiseaseDto GetById(Guid id)
        {
            var disease = _diseaseRepository.GetById(x => x.Id == id).FirstOrDefault();
            var diseaseDto = _mapper.Map<DiseaseDto>(disease);

            return diseaseDto;
        }

        public void Insert(DiseaseDto diseaseDto)
        {
            var disease = _mapper.Map<Disease>(diseaseDto);

            _diseaseRepository.Insert(disease);
            _unitOfWork.Commit();
        }

        public void Update(DiseaseDto diseaseDto)
        {
            var disease = _mapper.Map<Disease>(diseaseDto);

            _diseaseRepository.Update(disease);
            _unitOfWork.Commit();
        }

        public void Delete(DiseaseDto diseaseDto)
        {
            var disease = _mapper.Map<Disease>(diseaseDto);

            _diseaseRepository.Delete(disease);
            _unitOfWork.Commit();
        }
    }
}
