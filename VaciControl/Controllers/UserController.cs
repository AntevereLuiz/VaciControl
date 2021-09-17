using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Services;

namespace VaciControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<UserDto>> GetAll()
        {
            var users = _userService.GetAll();

            if (users == null)
            {
                return BadRequest();
            }

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var user = _userService.GetById(id);

            return Ok(user);
        }

        [HttpPost]
        public ActionResult<UserDto> Create([FromBody] UserDto user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            _userService.Insert(user);

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<UserDto> Update(Guid id, [FromBody] UserDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _userService.Update(entity);

            return Ok();
        }

        [HttpPut("remove/{id}")]
        public ActionResult<UserDto> Delete(Guid id, [FromBody] UserDto entity)
        {
            if (id == Guid.Empty || entity == null)
            {
                return BadRequest();
            }

            _userService.Delete(entity);

            return Ok();
        }
    }
}
