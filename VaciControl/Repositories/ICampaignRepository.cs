using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface ICampaignRepository : IRepository<Campaign>
    {
        List<Campaign> GetAllWithConditions(Expression<Func<Campaign, bool>> predicate);        
    }
}
