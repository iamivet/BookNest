using System.ComponentModel;

namespace BookNest.Data
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int YearOfPublication { get; set; }
        public string BookSummary { get; set; } = null!;
        public string CoverImage { get; set; } = null!;
        public decimal Price {  get; set; }
        public int Quantity {  get; set; }

        public int AuthorId {  get; set; }
        public Author Author { get; set; } = null!;

        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; } = null!;

        public int CategoryId {  get; set; }
        public Category Category { get; set; } = null!;

        public DateTime RegisterOn {  get; set; }

        public ICollection<Cart> Carts { get; set; }    = new List<Cart>();

        public ICollection<Order> Orders { get; set; }  = new List<Order>();
    }
}
