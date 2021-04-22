using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HardwareStoreServer.Models.DBModels
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Adress { get; set; }
        public string Number { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }
    }
}
