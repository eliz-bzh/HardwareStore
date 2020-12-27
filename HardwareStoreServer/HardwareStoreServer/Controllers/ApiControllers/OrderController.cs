using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HardwareStoreServer.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class OrderController : Controller
    {
        private readonly DBOrderService service;

        public OrderController(DBOrderService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Order order)
        {
            return service.Create(order);
        }

        [HttpGet("getAll")]
        public IList<Order> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("excelOrders")]
        public void GetExcel(DateTime from, DateTime to)
        {
            service.ExportOrdersToExcel(from, to);
        }

        [HttpGet("getById/{id}")]
        public Order GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Order order)
        {
            return service.Update(order);
        }
    }
}