using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBEmployeeService:IDBService<Employee>
    {
        private readonly ApplicationDbContext context;

        public DBEmployeeService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Employee entity)
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

        public IList<Employee> GetAll()
        {
            return context.Employees.ToList();
        }

        public Employee GetById(int id)
        {
            return context.Employees.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var deleted = context.Employees.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Employees.Remove(deleted).State;

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

        public bool Update(Employee newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Employees.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.Name = newEntity.Name;
            prevEntity.Surname = newEntity.Surname;
            prevEntity.Position = newEntity.Position;

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
