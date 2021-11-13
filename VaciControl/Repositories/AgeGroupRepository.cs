using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class AgeGroupRepository : Repository<AgeGroup>, IAgeGroupRepository
    {
        public AgeGroupRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<AgeGroup> GetAllWithConditions(Expression<Func<AgeGroup, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
    }
}
