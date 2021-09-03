using VaciControl.Persistense;

namespace VaciControl.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        public VaciControlDbContext _context;

        public UnitOfWork(VaciControlDbContext context)
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
