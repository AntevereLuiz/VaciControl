using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Services
{
    public interface IManufacturerService
    {
        List<ManufacturerDto> GetAll();
        ManufacturerDto GetById(Guid Id);
        void Insert(ManufacturerDto manufacturer);
        void Update(ManufacturerDto manufacturer);
        void Delete(ManufacturerDto manufacturer);
    }
}
