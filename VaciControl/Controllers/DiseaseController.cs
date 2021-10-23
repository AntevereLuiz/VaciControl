using Microsoft.AspNetCore.Mvc;
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
    }
}