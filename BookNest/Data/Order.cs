namespace BookNest.Data
{
    public class Order
    {
        public int Id { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; } = null!;

        public int Quantity { get; set; }

        public string CustomerId { get; set; } = null!;
        public Customer Customer { get; set; } = null!;

        public DateTime CreatedOn {  get; set; }
    }
}
