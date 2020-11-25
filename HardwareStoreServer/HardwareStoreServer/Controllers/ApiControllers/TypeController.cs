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
    public class TypeController : Controller
    {
        private readonly DBTypeService service;

        public TypeController(DBTypeService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Type type)
        {
            return service.Create(type);
        }

        [HttpGet("getAll")]
        public IList<Type> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Type GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Type type)
        {
            return service.Update(type);
        }
    }
}