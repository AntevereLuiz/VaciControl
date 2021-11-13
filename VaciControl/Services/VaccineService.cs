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
    public class VaccineService : IVaccineService
    {
        private IUnitOfWork _unitOfWork;
        private IVaccineRepository _vaccineRepository;
        private IDiseaseRepository _diseaseRepository;
        private IMapper _mapper;

        public VaccineService(IUnitOfWork unitOfWork,
                              IVaccineRepository vaccineRepository,
                              IMapper mapper,
                              IDiseaseRepository diseaseRepository)
        {
            _unitOfWork = unitOfWork;
            _vaccineRepository = vaccineRepository;
            _mapper = mapper;
            _diseaseRepository = diseaseRepository;
        }

        public List<VaccineDto> GetAll()
        {
            var allVaccines = _vaccineRepository.GetAll().ToList();
            var allVaccinesDto = _mapper.Map<List<VaccineDto>>(allVaccines);

            return allVaccinesDto;
        }

        public List<VaccineDto> GetAllWithConditions(VaccineFilter filter)
        {
            var vaccines = _vaccineRepository.GetAll().Where(x => x.Name.Contains(filter.Name) &&
                                                                  x.Disease.Nome.Contains(filter.Disease))
                                             .Include(x => x.Disease).ToList();

            var vaccinesDto = _mapper.Map<List<VaccineDto>>(vaccines);

            return vaccinesDto;
        }

        public VaccineDto GetById(Guid id)
        {
            var vaccine = _vaccineRepository.GetById(x => x.Id == id).Include(x => x.Disease).FirstOrDefault();
            var vaccineDto = _mapper.Map<VaccineDto>(vaccine);

            return vaccineDto;
        }

        public void Insert(VaccineDto vaccineDto)
        {
            var vaccine = _mapper.Map<Vaccine>(vaccineDto);

            if (_diseaseRepository.GetById(x => x.Id == vaccineDto.DiseaseId).FirstOrDefault() == null)
            {
                throw new Exception("Doença não encontrada.");
            }

            _vaccineRepository.Insert(vaccine);
            _unitOfWork.Commit();
        }

        public void Update(VaccineDto vaccineDto)
        {
            var vaccine = _mapper.Map<Vaccine>(vaccineDto);

            _vaccineRepository.Update(vaccine);
            _unitOfWork.Commit();
        }

        public void Delete(VaccineDto vaccineDto)
        {
            var vaccine = _mapper.Map<Vaccine>(vaccineDto);

            _vaccineRepository.Delete(vaccine);
            _unitOfWork.Commit();
        }
    }
}
