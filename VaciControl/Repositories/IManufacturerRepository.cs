using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IManufacturerRepository : IRepository<Manufacturer>
    {
        //List<Manufacturer> GetAllWithConditions(Expression<Func<Manufacturer, bool>> predicate);
    }
}
