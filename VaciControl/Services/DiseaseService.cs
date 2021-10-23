using AutoMapper;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
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

            var diseaseDtoDto = _mapper.Map<List<DiseaseDto>>(diseases);

            return diseaseDtoDto;
        }
    }
}
