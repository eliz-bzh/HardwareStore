using ClosedXML.Excel;
using HardwareStoreServer.Models;
using HardwareStoreServer.Models.DBModels;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;

namespace HardwareStoreServer.Services.DBServices
{
    public class ExcelService
    {
        //private readonly DBClientService clientService;
        //private readonly DBOrderService orderService;
        public ExcelService(DBClientService clientService)
        {
            //this.clientService = clientService;
            //this.orderService = orderService;
        }
        private string clientFormate(IList<Client> clients, int id)
        {
            foreach (var client in clients)
            {
                if (id == client.Id)
                {
                    return string.Concat(client.Name + " " + client.Surname);
                }
            }
            return " ";
        }
        public byte[] ExportDataForOrders(IEnumerable<Order> orders)
        {
            using (var context = new ApplicationDbContext())
            {
                var clients = context.Clients.ToList();
                
                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet workSheet = workbook.Worksheets.Add("Отчёт");

                    var range = workSheet.Range("A1:D1");
                    range.Value = "Заказы";
                    range.Merge();
                    range.Style.Font.Bold = true;

                    workSheet.Cell(2, 1).Value = "Номер заказа";
                    workSheet.Cell(2, 2).Value = "Клиент";
                    workSheet.Cell(2, 3).Value = "Дата заказа";
                    workSheet.Cell(2, 4).Value = "Сумма заказа";

                    int i = 3;
                    foreach (var item in orders)
                    {
                        workSheet.Cell(i, 1).Value = item.Id;
                        workSheet.Cell(i, 2).Value = clientFormate(clients, item.ClientId);
                        workSheet.Cell(i, 3).Value = item.Date.ToString("dd/MM/yyyy");
                        workSheet.Cell(i, 4).Value = item.TotalPrice;

                        ++i;
                    }
                    workSheet.Columns().AdjustToContents();
                    workSheet.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    var table = workSheet.Range(("A1:D" + (i-1)).ToString());
                    table.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    table.Style.Border.InsideBorder = XLBorderStyleValues.Thin;

                    using (MemoryStream stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        return stream.ToArray();
                    }
                }
            }
        }

        [Obsolete]
        public byte[] ExportDataForCart()
        {
            using (var context = new ApplicationDbContext())
            {
                var order = context.Orders.ToList().Last();
                var productsOrder = context.ProductOrderInfos.ToList().Where(product => product.OrderId == order.Id);
                var products = context.Products.ToList();

                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet workSheet = workbook.Worksheets.Add("Чек");

                    var range = workSheet.Range("A1:E1");
                    range.Value = "ООО «i-Bozh shop», ИНН: 77100678000";
                    range.Merge();
                    range.Style.Font.Bold = true;

                    range = workSheet.Range("A2:E2");
                    range.Value = "г. Минск, пр. Пушкина, 13, оф. 43";
                    range.Merge();
                    range.Style.Font.Bold = true;

                    range = workSheet.Range("A4:E4");
                    range.Value = "Товарный чек №" + order.Id + " от " + order.Date.ToString("dd/MM/yyyy");
                    range.Merge();
                    range.Style.Font.Bold = true;
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    workSheet.Cell(5, 1).Value = "№";
                    workSheet.Cell(5, 2).Value = "Наименование товара";
                    workSheet.Cell(5, 3).Value = "Кол-во";
                    workSheet.Cell(5, 4).Value = "Цена";
                    workSheet.Cell(5, 5).Value = "Итого";
                    range = workSheet.Range("A5:E5");
                    range.Style.Fill.BackgroundColor = XLColor.LightGray;
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    int i = 6;
                    int idProduct = 1;
                    foreach (var item in productsOrder)
                    {
                        var product = products.FirstOrDefault(product => item.ProductId == product.Id);
                        workSheet.Cell(i, 1).Value = idProduct;
                        workSheet.Cell(i, 2).Value = product.Name;
                        workSheet.Cell(i, 3).Value = item.Quantity;
                        workSheet.Cell(i, 4).Value = product.Price + " руб.";
                        workSheet.Cell(i, 5).Value = item.Quantity * product.Price + " руб.";

                        ++idProduct;
                        ++i;
                    }
                    workSheet.Cell(i, 5).Value = order.TotalPrice + " руб.";
                    workSheet.Columns().AdjustToContents();
                    var table = workSheet.Range("A5:E" + (i - 1));
                    table.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    table.Style.Border.InsideBorder = XLBorderStyleValues.Thin;


                    range = workSheet.Range(("A"+(i + 1) + ":E" + (i + 1)).ToString());
                    range.Value = "Всего наименований " + productsOrder.Count() + " на сумму " + order.TotalPrice + " руб.";
                    range.Merge();
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                    using (MemoryStream stream = new MemoryStream())
                    {
                        workSheet.Protect("i-Bozh2021");
                        workbook.Protect(true, true);
                        workbook.SaveAs(stream);
                        return stream.ToArray();
                    }
                }
            }
        }
    }
}
