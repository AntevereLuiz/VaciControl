using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet("{id}")]
        public ActionResult<PatientDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var user = _patientService.GetById(id);

            return Ok(user);
        }

        [HttpPost]
        public ActionResult<PatientDto> Create([FromBody] PatientDto patient)
        {
            if (patient == null)
            {
                return BadRequest();
            }

            _patientService.Insert(patient);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<PatientDto> Update(Guid id, [FromBody] PatientDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _patientService.Update(entity);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<PatientDto> Delete(Guid id, [FromBody] PatientDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _patientService.Delete(entity);

            return Ok();
        }
    }
}
