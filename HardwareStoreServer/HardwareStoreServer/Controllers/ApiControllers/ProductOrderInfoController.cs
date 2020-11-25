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
    public class ProductOrderInfoController : Controller
    {
        private readonly DBProductOrderInfoService service;

        public ProductOrderInfoController(DBProductOrderInfoService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(ProductOrderInfo productOrderInfo)
        {
            return service.Create(productOrderInfo);
        }

        [HttpGet("getAll")]
        public IList<ProductOrderInfo> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public ProductOrderInfo GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(ProductOrderInfo productOrderInfo)
        {
            return service.Update(productOrderInfo);
        }
    }
}