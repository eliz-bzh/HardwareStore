using System.Collections.Generic;
using System.Linq;
using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBTypeService:IDBService<Type>
    {
        private readonly ApplicationDbContext context;

        public DBTypeService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Type entity)
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

        public IList<Type> GetAll()
        {
            return context.Types.ToList();
        }

        public Type GetById(int id)
        {
            return context.Types.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Types.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Types.Remove(deleted).State;

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

        public bool Update(Type newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Types.FirstOrDefault(x => x.Id == newEntity.Id);

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
