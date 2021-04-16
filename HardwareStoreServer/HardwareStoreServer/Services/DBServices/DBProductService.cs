using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBProductService : IDBService<Product>
    {
        private readonly ApplicationDbContext context;

        public DBProductService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Product entity)
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
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IList<Product> GetAll()
        {
            //return context.Products.ToList();
            return context.Products.Include(p => p.Images).ToList();
        }

        public Product GetById(int id)
        {
            return context.Products.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Products.Include(p => p.Images).FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            foreach (var img in deleted.Images)
            {
                context.Remove(img);
            }

            try
            {
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            var result = context.Products.Remove(deleted).State;

            if (result != EntityState.Deleted)
            {
                return false;
            }

            try
            {
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Update(Product newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Products.Include(p => p.Images).FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.Name = newEntity.Name;
            prevEntity.Year = newEntity.Year;
            prevEntity.BrandId = newEntity.BrandId;
            prevEntity.TypeId = newEntity.TypeId;
            prevEntity.Modal = newEntity.Modal;
            prevEntity.Warranty = newEntity.Warranty;
            prevEntity.Price = newEntity.Price;
            prevEntity.Amount = newEntity.Amount;
            prevEntity.SupplyId = newEntity.SupplyId;

            if (newEntity.Images?.Count != 0)
            {
                foreach (var img in prevEntity.Images)
                {
                    context.Remove(img);
                }

                try
                {
                    context.SaveChanges();
                    prevEntity.Images = null;
                }
                catch
                {
                    return false;
                }
            }

            prevEntity.Images = newEntity.Images;

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
