using System;
using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IUserService
    {
        List<UserDto> GetAll();
        UserDto GetById(Guid id);
        void Insert(UserDto user);
        void Update(UserDto user);
        void Delete(UserDto user);
        List<UserDto> GetAllWithConditions(UserFilter filter);
    }
}
