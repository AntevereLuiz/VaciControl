using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgeGroupAndCampaignController : ControllerBase
    {
        private ICampaignService _campaignService;

        public AgeGroupAndCampaignController(ICampaignService campaignService)
        {
            _campaignService = campaignService;
        }

        [HttpPost("filter")]
        public ActionResult<List<CampaignDto>> GetAll([FromBody] CampaignFilter filter)
        {
            var campaigns = _campaignService.GetAllWithConditions(filter);

            if (campaigns == null)
            {
                return BadRequest();
            }

            return Ok(campaigns);
        }

        [HttpGet("{id}")]
        public ActionResult<CampaignDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var campaign = _campaignService.GetById(id);

            return Ok(campaign);
        }

        [HttpPost]
        public ActionResult<CampaignDto> Create([FromBody] CampaignDto campaign)
        {
            if (campaign == null)
            {
                return BadRequest();
            }

            _campaignService.Insert(campaign);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<CampaignDto> Update(Guid id, [FromBody] CampaignDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _campaignService.Update(entity);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<CampaignDto> Delete(Guid id, [FromBody] CampaignDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _campaignService.Delete(entity);

            return Ok();
        }

    }
}
