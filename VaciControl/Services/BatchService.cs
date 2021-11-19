using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;
using VaciControl.UoW;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace VaciControl.Services
{
    public class BatchService : IBatchService
    {
        private IUnitOfWork _unitOfWork;
        private IBatchRepository _batchRepository;
        private IMapper _mapper;

        public BatchService(IUnitOfWork unitOfWork,
                           IBatchRepository batchRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _batchRepository = batchRepository;
            _mapper = mapper;
        }

        public List<BatchDto> GetAll()
        {
            var allBatches = _batchRepository.GetAll().ToList();
            var allBatchesDto = _mapper.Map<List<BatchDto>>(allBatches);

            return allBatchesDto;
        }

        public List<BatchDto> GetAllWithConditions(BatchFilter filter)
        {
            var batches = _batchRepository.GetAll().Where(x => x.Vacina.Name.Contains(filter.Nome) &&
                                                               x.Fabricante.Nome.Contains(filter.Fabricante) &&
                                                               (filter.DataValidade == null || x.DataValidade == filter.DataValidade.Value))
                                                   .Include(x => x.Fabricante)
                                                   .Include(x => x.Vacina)
                                                   .ToList();

            var batchesDto = _mapper.Map<List<BatchDto>>(batches);

            return batchesDto;
        }

        public BatchDto GetById(Guid id)
        {
            var batch = _batchRepository.GetById(x => x.Id == id).Include(x => x.Vacina).Include(x=>x.Fabricante).FirstOrDefault();
            var batchDto = _mapper.Map<BatchDto>(batch);

            return batchDto;
        }

        public void Insert(BatchDto batchDto)
        {
            var batch = _mapper.Map<Batch>(batchDto);

            _batchRepository.Insert(batch);
            _unitOfWork.Commit();
        }

        public void Update(BatchDto batchDto)
        {
            var batch = _mapper.Map<Batch>(batchDto);

            _batchRepository.Update(batch);
            _unitOfWork.Commit();
        }

        public void Delete(BatchDto batchDto)
        {
            var batch = _mapper.Map<Batch>(batchDto);

            _batchRepository.Delete(batch);
            _unitOfWork.Commit();
        }
    }
}