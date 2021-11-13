using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class VaccineRepository : Repository<Vaccine>, IVaccineRepository
    {
        public VaccineRepository(VaciControlDbContext context) : base(context)
        {

        }
    }
}
