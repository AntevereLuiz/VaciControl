using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IAgeGroupRepository : IRepository<AgeGroup>
    {
        List<AgeGroup> GetAllWithConditions(Expression<Func<AgeGroup, bool>> predicate);
    }
}
