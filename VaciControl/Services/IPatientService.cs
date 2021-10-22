using System;
using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IPatientService
    {
        List<PatientDto> GetAll();
        PatientDto GetById(Guid id);
        void Insert(PatientDto user);
        void Update(PatientDto user);
        void Delete(PatientDto user);
        List<PatientDto> GetAllWithConditions(PatientFilter filter);
    }
}
