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
    public class StockController : Controller
    {
        private readonly DBStockService service;

        public StockController(DBStockService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Stock stock)
        {
            return service.Create(stock);
        }

        [HttpGet("getAll")]
        public IList<Stock> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Stock GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Stock stock)
        {
            return service.Update(stock);
        }
    }
}