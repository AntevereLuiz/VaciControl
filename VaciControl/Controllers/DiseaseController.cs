using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiseaseController : ControllerBase
    {
        private IDiseaseService _diseaseService;

        public DiseaseController(IDiseaseService diseaseService)
        {
            _diseaseService = diseaseService;
        }

        [HttpPost("filter")]
        public ActionResult<List<DiseaseDto>> GetAll([FromBody] DiseaseFilter filter)
        {
            var diseases = _diseaseService.GetAllWithConditions(filter);

            if (diseases == null)
            {
                return BadRequest();
            }

            return Ok(diseases);
        }

        [HttpGet("{id}")]
        public ActionResult<DiseaseDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var user = _diseaseService.GetById(id);

            return Ok(user);
        }

        [HttpPost]
        public ActionResult<DiseaseDto> Create([FromBody] DiseaseDto disease)
        {
            if (disease == null)
            {
                return BadRequest();
            }

            _diseaseService.Insert(disease);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<DiseaseDto> Update(Guid id, [FromBody] DiseaseDto disease)
        {
            if (id == Guid.Empty || disease == null)
            {
                return BadRequest();
            }

            _diseaseService.Update(disease);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<DiseaseDto> Delete(Guid id, [FromBody] DiseaseDto disease)
        {
            if (id == Guid.Empty || disease == null)
            {
                return BadRequest();
            }

            _diseaseService.Delete(disease);

            return Ok();
        }
    }
}