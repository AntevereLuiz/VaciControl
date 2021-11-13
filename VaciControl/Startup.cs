using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using VaciControl.Mapper;
using VaciControl.Persistense;
using VaciControl.Repositories;
using VaciControl.Services;
using VaciControl.UoW;
//Adicionados por causa da Autentica��o
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using VaciControl.Models;
using System.Text;
//

namespace VaciControl
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:24595").AllowAnyHeader().AllowCredentials().AllowAnyMethod();
                    });
            });
            services.AddDbContext<VaciControlDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IManufacturerService, ManufacturerService>();
            services.AddScoped<IManufacturerRepository, ManufacturerRepository>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IDiseaseService, DiseaseService>();
            services.AddScoped<IDiseaseRepository, DiseaseRepository>();
            services.AddScoped<IBatchService, BatchService>();
            services.AddScoped<IBatchRepository, BatchRepository>();
            services.AddScoped<ICampaignService, CampaignService>();
            services.AddScoped<ICampaignRepository, CampaignRepository>();
            services.AddScoped<IAgeGroupService, AgeGroupService>();
            services.AddScoped<IAgeGroupRepository, AgeGroupRepository>();

            services.AddScoped<IVaccineService, VaccineService>();
            services.AddScoped<IVaccineRepository, VaccineRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            var mapperConfig = new MapperConfiguration(x =>
            {
                x.AddProfile(new Mappers());
            });
            var mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "VaciControl", Version = "v1" });
            });

            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            services.AddAuthentication(x => //Criando um objeto de Autentica��o falando qual � o esquema padr�o de autentica��o e o challenge
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false; //HTTPS nesse caso n�o � obrigat�rio 
                x.SaveToken = true; //Salvar o token
                x.TokenValidationParameters = new TokenValidationParameters //PAr�metros da valida��o dos tokens
                {
                    ValidateIssuerSigningKey = true, //Reconhecer assinatura da chave 
                    IssuerSigningKey = new SymmetricSecurityKey(key), //Envia a chave 
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VaciControl v1"));
            }

            app.UseRouting();

            //Gerencia as chaves privadas e p�blicas
            app.UseAuthentication();

            app.UseAuthorization();
            //

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
