using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace HardwareStoreServer.Services.DBServices
{
    public class DBOrderService : IDBService<Order>
    {
        private readonly ApplicationDbContext context;
        private readonly ExcelService excelService;
        private readonly DBProductOrderInfoService productOrderInfoService;

        public DBOrderService(ApplicationDbContext context, ExcelService excelService, DBProductOrderInfoService productOrderInfo)
        {
            this.context = context;
            this.excelService = excelService;
            this.productOrderInfoService = productOrderInfo;
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

        public byte[] ExportOrdersToExcel(DateTime from, DateTime to)
        {
            var q = context.Orders.Where(o => o.Date > from && o.Date < to);
            return excelService.ExportDataForOrders(q);
        }

        public byte[] ExportCartToExcel()
        {
            return excelService.ExportDataForCart();
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
            var prodDel = context.ProductOrderInfos.Where(x => x.OrderId == id);

            if (deleted == null)
            {
                return false;
            }

            foreach (var prod in prodDel)
            {
                context.ProductOrderInfos.Remove(prod);
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

            prevEntity.ClientId = newEntity.ClientId;
            prevEntity.Date = newEntity.Date;
            prevEntity.TotalPrice = newEntity.TotalPrice;

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
