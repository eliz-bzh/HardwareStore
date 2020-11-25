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
    public class ProductController : Controller
    {
        private readonly DBProductService service;

        public ProductController(DBProductService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Product product)
        {
            return service.Create(product);
        }

        [HttpGet("getAll")]
        public IList<Product> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Product GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Product product)
        {
            return service.Update(product);
        }
    }
}