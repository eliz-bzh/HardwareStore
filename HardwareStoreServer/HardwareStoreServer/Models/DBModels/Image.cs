namespace HardwareStoreServer.Models.DBModels
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public override bool Equals(object obj)
        {
            if (!(obj is Image))
            {
                return false;
            }

            return ((Image)obj).Url.Equals(Url);
        }
    }
}
