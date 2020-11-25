using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Models.DBModels
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Year { get; set; }
        [ForeignKey("Brend")]
        public int BrendId { get; set; }
        public Brand Brend { get; set; }
        [ForeignKey("Type")]
        public int TypeId { get; set; }
        public Type Type { get; set; }
        public string Model { get; set; }
        public string Warranty { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        [ForeignKey("Supply")]
        public int SupplyId { get; set; }
        public Supply Supply { get; set; }

        [JsonIgnore]
        public ICollection<Stock> Stocks { get; set; }
        public ICollection<ProductOrderInfo> ProductOrderInfos { get; set; }

    }
}
