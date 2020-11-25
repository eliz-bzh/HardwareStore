using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBProductOrderInfoService: IDBService<ProductOrderInfo>
    {
        private readonly ApplicationDbContext context;

        public DBProductOrderInfoService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(ProductOrderInfo entity)
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

        public IList<ProductOrderInfo> GetAll()
        {
            return context.ProductOrderInfos.ToList();
        }

        public ProductOrderInfo GetById(int id)
        {
            return context.ProductOrderInfos.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.ProductOrderInfos.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.ProductOrderInfos.Remove(deleted).State;

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

        public bool Update(ProductOrderInfo newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.ProductOrderInfos.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.ProductId = newEntity.ProductId;
            prevEntity.OrderId = newEntity.OrderId;

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
