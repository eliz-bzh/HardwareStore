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
    public class BrandController : Controller
    {
        private readonly DBBrandService service;

        public BrandController(DBBrandService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Brand brand)
        {
            return service.Create(brand);
        }

        [HttpGet("getAll")]
        public IList<Brand> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Brand GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Brand brand)
        {
            return service.Update(brand);
        }
    }
}