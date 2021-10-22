using Microsoft.EntityFrameworkCore;
using VaciControl.Models;

namespace VaciControl.Persistense
{
    public class VaciControlDbContext : DbContext
    {
        public VaciControlDbContext(DbContextOptions<VaciControlDbContext> options) : base(options)
        {

        }        

        public DbSet<User> Users { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Patient> Patient { get; set; }              
    }
}
