using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class DiseaseRepository : Repository<Disease>, IDiseaseRepository
    {
        public DiseaseRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<Disease> GetAllWithConditions(Expression<Func<Disease, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
    }
}
