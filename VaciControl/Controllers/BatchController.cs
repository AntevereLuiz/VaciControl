//using Microsoft.AspNetCore.Authorization;
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
    public class BatchController : ControllerBase
    {
        private IBatchService _batchService;

        public BatchController(IBatchService batchService)
        {
            _batchService = batchService;
        }

        [HttpPost("filter")]
        public ActionResult<List<BatchDto>> GetAll([FromBody] BatchFilter filter)
        {
            var batches = _batchService.GetAllWithConditions(filter);

            if (batches == null)
            {
                return BadRequest();
            }

            return Ok(batches);
        }

        [HttpGet("{id}")]
        public ActionResult<BatchDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var batch = _batchService.GetById(id);

            return Ok(batch);
        }

        [HttpPost]
        public ActionResult<BatchDto> Create([FromBody] BatchDto batch)
        {
            if (batch == null)
            {
                return BadRequest();
            }

            _batchService.Insert(batch);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<BatchDto> Update(Guid id, [FromBody] BatchDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _batchService.Update(entity);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<BatchDto> Delete(Guid id, [FromBody] BatchDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _batchService.Delete(entity);

            return Ok();
        }
    }
}
