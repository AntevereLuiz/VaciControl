using System;
using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IVaccineService
    {
        List<VaccineDto> GetAll();
        VaccineDto GetById(Guid id);
        void Insert(VaccineDto user);
        void Update(VaccineDto user);
        void Delete(VaccineDto user);
        List<VaccineDto> GetAllWithConditions(VaccineFilter filter);
    }
}