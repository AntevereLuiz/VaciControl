using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IPatientService
    {
        List<PatientDto> GetAllWithConditions(PatientFilter filter);
    }
}
