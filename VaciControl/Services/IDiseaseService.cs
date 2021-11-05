using System;
using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IDiseaseService
    {
        DiseaseDto GetById(Guid Id);
        void Insert(DiseaseDto manufacturer);
        void Update(DiseaseDto manufacturer);
        void Delete(DiseaseDto manufacturer);
        List<DiseaseDto> GetAllWithConditions(DiseaseFilter filter);
    }
}
