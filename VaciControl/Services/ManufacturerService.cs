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
    public class ManufacturerService : IManufacturerService
    {
        private IUnitOfWork _unitOfWork;
        private IManufacturerRepository _manufacturerRepository;
        private IMapper _mapper;

        public ManufacturerService(IUnitOfWork unitOfWork, IManufacturerRepository manufacturerRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _manufacturerRepository = manufacturerRepository;
            _mapper = mapper;
        }

        public void Insert(ManufacturerDto manufacturerDto)
        {
            var manufacturer = _mapper.Map<Manufacturer>(manufacturerDto);

            _manufacturerRepository.Insert(manufacturer);
            _unitOfWork.Commit();
        }

        public void Update(ManufacturerDto manufacturerDto)
        {
            var manufacturer = _mapper.Map<Manufacturer>(manufacturerDto);

            _manufacturerRepository.Update(manufacturer);
            _unitOfWork.Commit();
        }
        public void Delete(ManufacturerDto manufacturerDto)
        {           
            var manufacturer = _mapper.Map<Manufacturer>(manufacturerDto);

            _manufacturerRepository.Delete(manufacturer);
            _unitOfWork.Commit();
        }

        public List<ManufacturerDto> GetAll()
        {
            var allManufacturer = _manufacturerRepository.GetAll().ToList();
            var allManufacturerDto = _mapper.Map<List<ManufacturerDto>>(allManufacturer);

            return allManufacturerDto;
        }

        public List<ManufacturerDto> GetAllWithConditions(ManufacturerFilter filter)
        {
            var manufacturer = _manufacturerRepository.GetAllWithConditions(x => x.Nome.Contains(filter.Nome) &&
                                                                                 x.Cnpj.Contains(filter.Cnpj));
            var manufacturerDto = _mapper.Map<List<ManufacturerDto>>(manufacturer);

            return manufacturerDto;
        }

        public ManufacturerDto GetById(Guid id)
        {
            var manufacturer = _manufacturerRepository.GetById(x => x.Id == id);
            var manufacturerDto = _mapper.Map<ManufacturerDto>(manufacturer);

            return manufacturerDto;
        }
    }
}
