using ClosedXML.Excel;
using HardwareStoreServer.Models;
using HardwareStoreServer.Models.DBModels;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HardwareStoreServer.Services.DBServices
{
    public class ExcelService
    {
        private readonly DBClientService clientController;
        public ExcelService(DBClientService service)
        {
            this.clientController = service;
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
        public string ExportData(IEnumerable<Order> orders)
        {
            using (var context = new ApplicationDbContext())
            {
                var clients = clientController.GetAll();
                string path = Path.Combine(@"D:", "Report.xlsx");

                //string path = "D:\\Report.xlsx";

                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet workSheet = workbook.Worksheets.Add("Отчёт");

                    workSheet.Cells().Clear();
                    //var ws = p.Workbook.Worksheets.Add("Отчёт");

                    workSheet.Cell(1, 1).Value = "Номер заказа";
                    workSheet.Cell(1, 2).Value = "Клиент";
                    workSheet.Cell(1, 3).Value = "Дата заказа";
                    workSheet.Cell(1, 4).Value = "Сумма заказа";

                    int i = 2;
                    foreach (var item in orders)
                    {
                        workSheet.Cell(i, 1).Value = item.Id;
                        workSheet.Cell(i, 2).Value = clientFormate(clients, item.ClientId);
                        workSheet.Cell(i, 3).Value = item.Date.ToString("dd/MM/yyyy");
                        workSheet.Cell(i, 4).Value = item.TotalPrice;

                        ++i;
                    }
                    workSheet.Columns().AdjustToContents();

                    workbook.SaveAs(path);
                }
                return path;
            }
        }
    }
}
