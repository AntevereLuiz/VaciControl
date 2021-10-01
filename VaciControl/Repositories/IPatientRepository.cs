using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IPatientRepository
    {
        List<Patient> GetAllWithConditions(Expression<Func<Patient, bool>> predicate);
    }
}
