using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBOrderService: IDBService<Order>
    {
        private readonly ApplicationDbContext context;

        public DBOrderService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Order entity)
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

        public IList<Order> GetAll()
        {
            return context.Orders.ToList();
        }

        public Order GetById(int id)
        {
            return context.Orders.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Orders.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Orders.Remove(deleted).State;

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

        public bool Update(Order newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Orders.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.EmployeeId = newEntity.EmployeeId;
            prevEntity.ClientId = newEntity.ClientId;
            prevEntity.Date = newEntity.Date;

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
