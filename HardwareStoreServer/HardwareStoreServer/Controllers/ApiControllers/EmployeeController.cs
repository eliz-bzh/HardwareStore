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
    public class EmployeeController : Controller
    {
        private readonly DBEmployeeService service;

        public EmployeeController(DBEmployeeService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Employee employee)
        {
            return service.Create(employee);
        }

        [HttpGet("getAll")]
        public IList<Employee> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("getById/{id}")]
        public Employee GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpPut("edit")]
        public bool Update(Employee employee)
        {
            return service.Update(employee);
        }
    }
}