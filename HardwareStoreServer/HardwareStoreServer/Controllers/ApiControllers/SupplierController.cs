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
    public class SupplierController : Controller
    {
        private readonly DBSupplierService service;

        public SupplierController(DBSupplierService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Supplier supplier)
        {
            return service.Create(supplier);
        }

        [HttpGet("getAll")]
        public IList<Supplier> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Supplier GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Supplier supplier)
        {
            return service.Update(supplier);
        }
    }
}