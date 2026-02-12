using Microsoft.AspNetCore.Identity;

namespace BookNest.Data
{
    public class Customer : IdentityUser
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public ICollection<Cart> Carts { get; set; }
    = new List<Cart>();

        public ICollection<Order> Orders { get; set; }
    = new List<Order>();
    }
}
