using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBSupplierService:IDBService<Supplier>
    {
        private readonly ApplicationDbContext context;

        public DBSupplierService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Supplier entity)
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

        public IList<Supplier> GetAll()
        {
            return context.Suppliers.ToList();
        }

        public Supplier GetById(int id)
        {
            return context.Suppliers.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Suppliers.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Suppliers.Remove(deleted).State;

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

        public bool Update(Supplier newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Suppliers.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.NameOrganization = newEntity.NameOrganization;
            prevEntity.Number = newEntity.Number;
            prevEntity.Adress = newEntity.Adress;

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
