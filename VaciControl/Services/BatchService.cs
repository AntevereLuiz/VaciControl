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
            var batches = _batchRepository.GetAllWithConditions(x => x.Nome.Contains(filter.Nome) &&
                                                                  //ESTÁ CERTO ABAIXO?
                                                                  x.Fabricante.Nome.Contains(filter.Fabricante) &&
                                                                  (filter.DataValidade == null || x.DataValidade == filter.DataValidade.Value.Date));
            var batchesDto = _mapper.Map<List<BatchDto>>(batches);

            return batchesDto;
        }

        public BatchDto GetById(Guid id)
        {
            var batch = _batchRepository.GetById(x => x.Id == id);
            var batchDto = _mapper.Map<BatchDto>(batch);

            return batchDto;
        }

        //TEM QUE POR OS OUTRO FILTROS OU DEIXA SÓ O GETBYID?

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

            _batchRepository.Update(batch);
            _unitOfWork.Commit();
        }
    }
}