using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class PatientRepository : Repository<Patient>, IPatientRepository
    {
        public PatientRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<Patient> GetAllWithConditions(Expression<Func<Patient, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
    }
}