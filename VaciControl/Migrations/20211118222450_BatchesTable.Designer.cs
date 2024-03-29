﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VaciControl.Persistense;

namespace VaciControl.Migrations
{
    [DbContext(typeof(VaciControlDbContext))]
    [Migration("20211118222450_BatchesTable")]
    partial class BatchesTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VaciControl.Models.AgeGroup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CampaignId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateFim")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateIni")
                        .HasColumnType("datetime2");

                    b.Property<int>("MaxAge")
                        .HasColumnType("int");

                    b.Property<int>("MinAge")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CampaignId");

                    b.ToTable("AgeGroups");
                });

            modelBuilder.Entity("VaciControl.Models.Batch", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AplicacoesPorFrasco")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataEntrada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataValidade")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("FabricanteId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QtdeFrascos")
                        .HasColumnType("int");

                    b.Property<int>("TotalAplicacoesPossiveis")
                        .HasColumnType("int");

                    b.Property<Guid>("VacinaId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("FabricanteId");

                    b.HasIndex("VacinaId");

                    b.ToTable("Batches");
                });

            modelBuilder.Entity("VaciControl.Models.Campaign", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CampaignName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("DiseaseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("DiseaseId");

                    b.ToTable("Campaigns");
                });

            modelBuilder.Entity("VaciControl.Models.Disease", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Diseases");
                });

            modelBuilder.Entity("VaciControl.Models.Manufacturer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Cnpj")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Manufacturers");
                });

            modelBuilder.Entity("VaciControl.Models.Patient", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Cpf")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("VaciControl.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Cpf")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VaciControl.Models.Vaccine", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<Guid>("DiseaseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("IntervaloProximaDose")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DiseaseId");

                    b.ToTable("Vaccine");
                });

            modelBuilder.Entity("VaciControl.Models.AgeGroup", b =>
                {
                    b.HasOne("VaciControl.Models.Campaign", null)
                        .WithMany("AgeGroups")
                        .HasForeignKey("CampaignId");
                });

            modelBuilder.Entity("VaciControl.Models.Batch", b =>
                {
                    b.HasOne("VaciControl.Models.Manufacturer", "Fabricante")
                        .WithMany()
                        .HasForeignKey("FabricanteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VaciControl.Models.Vaccine", "Vacina")
                        .WithMany()
                        .HasForeignKey("VacinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Fabricante");

                    b.Navigation("Vacina");
                });

            modelBuilder.Entity("VaciControl.Models.Campaign", b =>
                {
                    b.HasOne("VaciControl.Models.Disease", "Disease")
                        .WithMany()
                        .HasForeignKey("DiseaseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Disease");
                });

            modelBuilder.Entity("VaciControl.Models.Vaccine", b =>
                {
                    b.HasOne("VaciControl.Models.Disease", "Disease")
                        .WithMany()
                        .HasForeignKey("DiseaseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Disease");
                });

            modelBuilder.Entity("VaciControl.Models.Campaign", b =>
                {
                    b.Navigation("AgeGroups");
                });
#pragma warning restore 612, 618
        }
    }
}
