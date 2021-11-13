using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Services
{
    public interface IBatchService
    {
        List<BatchDto> GetAll();
        BatchDto GetById(Guid id);
        void Insert(BatchDto batch);
        void Update(BatchDto batch);
        void Delete(BatchDto batch);
        List<BatchDto> GetAllWithConditions(BatchFilter filter);
    }
}