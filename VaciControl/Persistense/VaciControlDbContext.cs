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
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Disease> Diseases { get; set; }
        public DbSet<Batch> Batches { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<AgeGroup> AgeGroups { get; set; }
        public DbSet<Vaccine> Vaccine { get; set; }
    }
}
