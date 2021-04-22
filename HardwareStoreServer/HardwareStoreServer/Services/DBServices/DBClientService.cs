using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBClientService : IDBService<Client>
    {
        private readonly ApplicationDbContext context;

        public DBClientService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Create(Client entity)
        {
            if (entity == null)
            {
                return false;
            }

            var user = context.Clients.FirstOrDefault(c => c.Login.Equals(entity.Login));

            if (user != null)
            {
                throw new Exception("User already register");
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

        public IList<Client> GetAll()
        {
            return context.Clients.ToList();
        }

        public Client GetById(int id)
        {
            return context.Clients.FirstOrDefault(x => x.Id == id);
        }

        public Client GetByLogin(string login)
        {
            return context.Clients.FirstOrDefault(x => x.Login == login);
        }

        public bool Remove(int id)
        {
            var deleted = context.Clients.FirstOrDefault(x => x.Id == id);

            if (deleted == null)
            {
                return false;
            }

            var result = context.Clients.Remove(deleted).State;

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

        public bool Update(Client newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            var prevEntity = context.Clients.FirstOrDefault(x => x.Id == newEntity.Id);

            if (prevEntity == null)
            {
                return false;
            }

            prevEntity.Name = newEntity.Name;
            prevEntity.Surname = newEntity.Surname;
            prevEntity.Adress = newEntity.Adress;
            prevEntity.Number = newEntity.Number;
            prevEntity.Email = newEntity.Email;
            prevEntity.Login = newEntity.Login;
            prevEntity.Password = newEntity.Password;

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
