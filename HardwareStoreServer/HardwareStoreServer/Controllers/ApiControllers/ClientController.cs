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
    public class ClientController : Controller
    {
        private readonly DBClientService service;

        public ClientController(DBClientService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create([FromBody]Client client)
        {
            return service.Create(client);
        }

        [HttpGet("getAll")]
        public IList<Client> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Client GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpGet("getByLogin/{login}")]
        public Client GetByLogin(string login)
        {
            return service.GetByLogin(login);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Client client)
        {
            return service.Update(client);
        }
    }
}