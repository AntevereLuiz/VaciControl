using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class BatchRepository : Repository<Batch>, IBatchRepository
    {
        public BatchRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<Batch> GetAllWithConditions(Expression<Func<Batch, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
      
    }
}
