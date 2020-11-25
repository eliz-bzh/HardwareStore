using System.Collections.Generic;

namespace HardwareStoreServer.Services.DBServices
{
    public interface IDBService<T>
    {
        bool Create(T entity);
        IList<T> GetAll();
        T GetById(int id);
        bool Remove(int id);
        bool Update(T newEntity);
    }
}
