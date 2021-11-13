using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccineController : ControllerBase
    {
        private IVaccineService _vaccineService;

        public VaccineController(IVaccineService vaccineService)
        {
            _vaccineService = vaccineService;
        }

        [HttpPost("filter")]
        public ActionResult<List<VaccineDto>> GetAll([FromBody] VaccineFilter filter)
        {
            var vaccines = _vaccineService.GetAllWithConditions(filter);

            if (vaccines == null)
            {
                return BadRequest();
            }

            return Ok(vaccines);
        }

        [HttpGet("{id}")]
        public ActionResult<VaccineDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var vaccine = _vaccineService.GetById(id);

            return Ok(vaccine);
        }

        [HttpPost]
        public ActionResult<VaccineDto> Create([FromBody] VaccineDto vaccine)
        {
            if (vaccine == null)
            {
                return BadRequest();
            }

            _vaccineService.Insert(vaccine);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<VaccineDto> Update(Guid id, [FromBody] VaccineDto vaccine)
        {
            if (id == Guid.Empty || vaccine == null)
            {
                return BadRequest();
            }

            _vaccineService.Update(vaccine);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<VaccineDto> Delete(Guid id, [FromBody] VaccineDto vaccine)
        {
            if (id == Guid.Empty || vaccine == null)
            {
                return BadRequest();
            }

            _vaccineService.Delete(vaccine);

            return Ok();
        }
    }
}
