using AutoMapper;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Repositories;
using VaciControl.UoW;

namespace VaciControl.Services
{
    public class PatientService : IPatientService
    {
        private IUnitOfWork _unitOfWork;
        private IPatientRepository _patientRepository;
        private IMapper _mapper;

        public PatientService(IUnitOfWork unitOfWork,
                           IPatientRepository userRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _patientRepository = userRepository;
            _mapper = mapper;
        }

        public List<PatientDto> GetAllWithConditions(PatientFilter filter)
        {
            var patients = _patientRepository.GetAllWithConditions(x => x.Nome.Contains(filter.Nome) &&
                                                                        x.Cpf.Contains(filter.Cpf) &&
                                                                        x.Email.Contains(filter.Email) &&
                                                                        (filter.Status == null || x.Status == filter.Status.Value) &&
                                                                        (filter.DataNascimento == null || x.DataNascimento == filter.DataNascimento));
            var patientDtoDto = _mapper.Map<List<PatientDto>>(patients);

            return patientDtoDto;
        }
    }
}
