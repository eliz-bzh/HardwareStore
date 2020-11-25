using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HardwareStoreServer.Models.DBModels
{
    public class Supplier
    {
        public int Id { get; set; }
        public string NameOrganization { get; set; }
        public string Number { get; set; }
        public string Adress { get; set; }

        [JsonIgnore]
        public ICollection<Supply> Supplies { get; set; }
    }
}
