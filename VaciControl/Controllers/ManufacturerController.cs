using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")] /*Definindo o roteamento, pois é a partir dele que se consegue acessar os recursos*/
    [ApiController] /*Atributo que habilita comportamentos específicos da Api*/

    public class ManufacturerController : ControllerBase /*O ControllerBase ele dá suporte à propriedades e métodos das requisições http*/
    {
        
        private IManufacturerService _manufacturerService;
               
        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        /***************** Métodos HTTP *****************/
        [HttpGet]
        public ActionResult<List<ManufacturerDto>> GetAll()
        {
            var manufacturer = _manufacturerService.GetAll();

            if (manufacturer == null)
            {
                return BadRequest();
            }

            return Ok(manufacturer);
        }

        [HttpGet("{id}")]
        public ActionResult<ManufacturerDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var manufacturer = _manufacturerService.GetById(id);

            return Ok(manufacturer);
        }

        [HttpPost]
        public ActionResult<ManufacturerDto> Create([FromBody] ManufacturerDto manufacturer)
        {
            if (manufacturer == null)
            {
                return BadRequest();
            }

            _manufacturerService.Insert(manufacturer);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<ManufacturerDto> Update(Guid id, [FromBody] ManufacturerDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _manufacturerService.Update(entity);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<ManufacturerDto> Delete(Guid id, [FromBody] ManufacturerDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _manufacturerService.Delete(entity);

            return Ok();
        }

    }
}
