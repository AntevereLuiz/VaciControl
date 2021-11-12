using AutoMapper;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Mapper
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Disease, DiseaseDto>().ReverseMap();
            CreateMap<Vaccine, VaccineDto>().ReverseMap();
        }
    }
}
