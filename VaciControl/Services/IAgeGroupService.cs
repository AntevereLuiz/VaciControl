using System;
using System.Collections.Generic;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Services
{
    public interface IAgeGroupService
    {
        List<AgeGroupDto> GetAll();
        AgeGroupDto GetById(Guid id);
        void Insert(AgeGroupDto ageGroup);
        void Update(AgeGroupDto ageGroup);
        void Delete(AgeGroupDto ageGroup);
        //List<AgeGroupDto> GetAllWithConditions(AgeGroupFilter filter);
    }
}