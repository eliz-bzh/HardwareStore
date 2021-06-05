using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using HardwareStoreServer.Models;
using HardwareStoreServer.Models.DBModels;
using HardwareStoreServer.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace HardwareStoreServer.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class OrderController : Controller
    {
        private readonly DBOrderService service;
        private readonly ApplicationDbContext _context;
        private readonly DBClientService clientController;

        public OrderController(ApplicationDbContext context, DBOrderService service, DBClientService clientService)
        {
            this._context = context;
            this.service = service;
            this.clientController = clientService;
        }

        [HttpPost("create")]
        public bool Create(Order order)
        {
            return service.Create(order);
        }

        [HttpPost("makeOrder")]
        public async Task MakeOrder([FromQuery]int clientId, [FromQuery]int totalPrice, [FromBody]ProductOrderInfo[] items)
        {
            if (items.Length == 0)
            {
                return;
            }

            var newOrder = new Order()
            {
                ClientId = clientId,
                Date = DateTime.Now,
                TotalPrice = totalPrice
            };

            await _context.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            for (int i = 0; i < items.Length; i++)
            {
                //items[i].ProductId = items[i].Id;
                items[i].OrderId = newOrder.Id;
            }

            await _context.AddRangeAsync(items);
            await _context.SaveChangesAsync();
        }

        [HttpGet("getAll")]
        public IList<Order> GetAll()
        {
            return service.GetAll();
        }
        private string clientFormate(IList<Client> clients, int id)
        {
            foreach (var client in clients)
            {
                if (id == client.Id)
                {
                    return string.Concat(client.Name + " " + client.Surname);
                }
            }
            return " ";
        }

        [HttpGet("excelOrders")]
        public FileResult GetExcelOrders([FromQuery]DateTime from, [FromQuery]DateTime to)
        {
            var data = service.ExportOrdersToExcel(from, to);
            return File(data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Report.xlsx");
        }

        [HttpGet("excelCart")]
        public FileResult GetExcelCart()
        {
            var data = service.ExportCartToExcel();
            return File(data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "CheckOnline.xlsx");
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