﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.Persistense;

namespace VaciControl.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected VaciControlDbContext _context;

        public Repository(VaciControlDbContext context)
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> GetById(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate).AsNoTracking();
        }

        public IQueryable<T> GetByIdTracking(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public void Insert(T entity)
        {
            _context.Entry(entity).State = EntityState.Added;
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
    }
}
