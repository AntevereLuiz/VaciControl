﻿using AutoMapper;
using System.Collections.Generic;
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
            CreateMap<Batch, BatchDto>().ReverseMap();
            CreateMap<Campaign, CampaignDto>().ReverseMap();
            CreateMap<AgeGroup, AgeGroupDto>().ReverseMap();
            CreateMap<Vaccine, VaccineDto>().ReverseMap();
        }
    }
}