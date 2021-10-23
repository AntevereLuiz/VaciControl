using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IDiseaseService
    {
        List<DiseaseDto> GetAllWithConditions(DiseaseFilter filter);
    }
}
