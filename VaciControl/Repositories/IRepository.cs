using System;
using System.Linq;
using System.Linq.Expressions;

namespace VaciControl.Repositories
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
        T GetById(Expression<Func<T, bool>> predicate);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
