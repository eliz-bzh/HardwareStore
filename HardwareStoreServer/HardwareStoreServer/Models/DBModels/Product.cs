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
        [ForeignKey("Brand")]
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        [ForeignKey("Type")]
        public int TypeId { get; set; }
        public Type Type { get; set; }
        public string Modal { get; set; }
        public int Warranty { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        [ForeignKey("Supply")]
        public int SupplyId { get; set; }
        public Supply Supply { get; set; }
        public string Image { get; set; } 

        [JsonIgnore]
        public ICollection<Stock> Stocks { get; set; }
        public ICollection<ProductOrderInfo> ProductOrderInfos { get; set; }

    }
}
