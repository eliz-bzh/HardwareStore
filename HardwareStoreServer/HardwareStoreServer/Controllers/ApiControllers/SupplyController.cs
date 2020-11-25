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
    public class SupplyController : Controller
    {
        private readonly DBSupplyService service;

        public SupplyController(DBSupplyService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Supply supply)
        {
            return service.Create(supply);
        }

        [HttpGet("getAll")]
        public IList<Supply> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Supply GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Supply supply)
        {
            return service.Update(supply);
        }
    }
}