using System;
using System.Collections.Generic;
using VaciControl.DTOs;

namespace VaciControl.Services
{
    public interface IManufacturerService
    {
        List<ManufacturerDto> GetAll();
        ManufacturerDto GetById(Guid Id);
        void Insert(ManufacturerDto manufacturer);
        void Update(ManufacturerDto manufacturer);
        void Delete(ManufacturerDto manufacturer);
        List<ManufacturerDto> GetAllWithConditions(ManufacturerFilter filter);
    }
}
