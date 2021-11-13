using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class CampaignRepository : Repository<Campaign>, ICampaignRepository
    {
        public CampaignRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<Campaign> GetAllWithConditions(Expression<Func<Campaign, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
    }
}
