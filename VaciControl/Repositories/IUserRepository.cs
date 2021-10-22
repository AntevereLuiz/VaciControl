using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;

namespace VaciControl.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        List<User> GetAllWithConditions(Expression<Func<User, bool>> predicate);
        User GetByCPF(Expression<Func<User, bool>> predicate);
    }
}
