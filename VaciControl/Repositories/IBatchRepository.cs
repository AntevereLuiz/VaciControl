using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IBatchRepository : IRepository<Batch>
    {
        List<Batch> GetAllWithConditions(Expression<Func<Batch, bool>> predicate);
    }
}
