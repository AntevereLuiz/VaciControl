using AutoMapper;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Models;
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
                                                                        (filter.DataNascimento == null || x.DataNascimento == filter.DataNascimento.Value.Date));
            var patientDtoDto = _mapper.Map<List<PatientDto>>(patients);

            return patientDtoDto;
        }

        public PatientDto GetById(Guid id)
        {
            var patient = _patientRepository.GetById(x => x.Id == id);
            var patientDto = _mapper.Map<PatientDto>(patient);

            return patientDto;
        }

        public void Insert(PatientDto patientDto)
        {
            patientDto.Status = true;
            patientDto.DataNascimento = patientDto.DataNascimento.Date;
            var patient = _mapper.Map<Patient>(patientDto);

            _patientRepository.Insert(patient);
            _unitOfWork.Commit();
        }

        public void Update(PatientDto patientDto)
        {
            patientDto.DataNascimento = patientDto.DataNascimento.Date;
            var patient = _mapper.Map<Patient>(patientDto);

            _patientRepository.Update(patient);
            _unitOfWork.Commit();
        }

        public void Delete(PatientDto patientDto)
        {
            patientDto.Status = false;
            var patient = _mapper.Map<Patient>(patientDto);

            _patientRepository.Update(patient);
            _unitOfWork.Commit();
        }
    }
}
