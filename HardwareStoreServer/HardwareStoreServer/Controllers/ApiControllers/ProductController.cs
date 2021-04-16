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
        public bool Create([FromBody] Product product)
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
        public bool Update([FromBody] Product product)
        {
            return service.Update(product);
        }

        [HttpGet("baners")]
        public JsonResult GetAllBaners()
        {
            return Json(new[] {
                new {
                    width = 1200,
                    height = 420,
                    url = "https://res.cloudinary.com/dzlhauo5h/image/upload/v1618507935/hardware-store/baners/a1cbdf1c74060e2630ca8ecb7b4e3b9a_muerar.jpg"
                },
                new {
                    width = 1200,
                    height = 420,
                    url = "https://res.cloudinary.com/dzlhauo5h/image/upload/v1618507919/hardware-store/baners/3eb5a6264a2b93dac3399931a5f29915_uusnvf.jpg"
                },
                new{
                    width = 1200,
                    height = 420,
                    url = "https://res.cloudinary.com/dzlhauo5h/image/upload/v1618507903/hardware-store/baners/0fef8f9ba7ede31f76aa598578aca995_xcubly.jpg"
                },
                new{
                    width = 1200,
                    height = 420,
                    url = "https://res.cloudinary.com/dzlhauo5h/image/upload/v1618507889/hardware-store/baners/cd4b95d999de442076993cac56ee8605_fxcl9b.jpg"
                },
                new{
                    width = 1200,
                    height = 420,
                    url = "https://res.cloudinary.com/dzlhauo5h/image/upload/v1618507871/hardware-store/baners/a4765e1a2d3f80c9e862b4779d30cf79_tmxotb.jpg"
                }
            });
        }
    }
}