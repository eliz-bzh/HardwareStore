using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBBrandService: IDBService<Brand>
    {
        private readonly ApplicationDbContext context;

        public DBBrandService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Brand entity)
        {
            if (entity == null)
            {
                return false;
            }
            var state = context.Add(entity).State;

            if (state != EntityState.Added)
            {
                return false;
            }

            try
            {
                context.SaveChanges();

            }
            catch
            {
                return false;
            }

            return true;
        }

        public IList<Brand> GetAll()
        {
            return context.Brands.ToList();
        }

        public Brand GetById(int id)
        {
            return context.Brands.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Brands.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Brands.Remove(deleted).State;

            if (result != EntityState.Deleted)
            {
                return false;
            }

            try
            {
                context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool Update(Brand newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Brands.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.Name = newEntity.Name;

            try
            {
                context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
