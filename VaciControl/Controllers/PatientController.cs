using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpPost("filter")]
        public ActionResult<List<PatientDto>> GetAll([FromBody] PatientFilter filter)
        {
            var patients = _patientService.GetAllWithConditions(filter);

            if (patients == null)
            {
                return BadRequest();
            }

            return Ok(patients);
        }
    }
}
