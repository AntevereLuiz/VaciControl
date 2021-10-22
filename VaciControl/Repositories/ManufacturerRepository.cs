using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class ManufacturerRepository : Repository<Manufacturer>, IManufacturerRepository
    {
        public ManufacturerRepository(VaciControlDbContext context) : base(context)
        {

        }
        
        public List<Manufacturer> GetAllWithConditions(Expression<Func<Manufacturer, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
        
    }
}
