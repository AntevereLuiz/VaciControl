using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(VaciControlDbContext context) : base(context)
        {

        }

        public List<User> GetAllWithConditions(Expression<Func<User, bool>> predicate)
        {
            return GetAll().Where(predicate).ToList();
        }
        
        public User GetByCPF(Expression<Func<User, bool>> predicate)
        {
            return GetById(predicate);
        }       
    }
}
