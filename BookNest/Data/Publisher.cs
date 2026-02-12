namespace BookNest.Data
{
    public class Publisher
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string City { get; set; } = null!;
        public ICollection<Book> Books { get; set; }
        = new List<Book>();
    }
}
