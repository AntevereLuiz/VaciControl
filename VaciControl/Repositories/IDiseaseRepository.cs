using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IDiseaseRepository : IRepository<Disease>
    {
        List<Disease> GetAllWithConditions(Expression<Func<Disease, bool>> predicate);
    }
}
