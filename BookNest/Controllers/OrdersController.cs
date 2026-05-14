using BookNest.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BookNest.Controllers
{
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Customer> _userManager;

        public OrdersController(ApplicationDbContext context, UserManager<Customer> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Orders
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Orders.Include(o => o.Book).Include(o => o.Customer);
            return View(await applicationDbContext.ToListAsync());
        }



        // GET: Orders
        public async Task<IActionResult> CustomerOrders()
        {
            var userId = _userManager.GetUserId(User);

            var applicationDbContext = _context.Orders.Include(o => o.Book).Include(o => o.Customer).Where(o => o.CustomerId == userId);
            return View("Index", applicationDbContext);
        }

        // GET: Orders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var baseOrder = await _context.Orders
                .Include(o => o.Book)
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (baseOrder == null)
            {
                return NotFound();
            }

            var allItemsInOrder = await _context.Orders
        .Include(o => o.Book)
        .Where(o => o.CustomerId == baseOrder.CustomerId &&
                    o.CreatedOn.Year == baseOrder.CreatedOn.Year &&
                    o.CreatedOn.Month == baseOrder.CreatedOn.Month &&
                    o.CreatedOn.Day == baseOrder.CreatedOn.Day &&
                    o.CreatedOn.Hour == baseOrder.CreatedOn.Hour &&
                    o.CreatedOn.Minute == baseOrder.CreatedOn.Minute)
        .ToListAsync();

            return View(allItemsInOrder);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create()
        {
            var userId = _userManager.GetUserId(User);

            var cartItems = await _context.Carts
                .Where(c => c.CustomerId == userId)
                .ToListAsync();

            if (cartItems.Count == 0)
            {
                return RedirectToAction("Index", "Carts");
            }

            foreach (Cart cartItem in cartItems)
            {
                Book? book = await _context.Books
                .FirstOrDefaultAsync(b => b.Id == cartItem.BookId);

                if (book == null)
                {
                    return NotFound();
                }

                book.Quantity -= cartItem.Quantity;
                await _context.SaveChangesAsync();
            }

            foreach (var item in cartItems)
            {
                var order = new Order
                {
                    BookId = item.BookId,
                    Quantity = item.Quantity,
                    CustomerId = userId,
                    CreatedOn = DateTime.Now
                };
                _context.Orders.Add(order);
            }

            _context.Carts.RemoveRange(cartItems);


            await _context.SaveChangesAsync();

            return RedirectToAction("Index", "Orders");
        }

        // POST: Orders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,BookId,Quantity,CustomerId,CreatedOn")] Order order)
        {
            if (id != order.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(order.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["BookId"] = new SelectList(_context.Books, "Id", "Id", order.BookId);
            ViewData["CustomerId"] = new SelectList(_context.Users, "Id", "Id", order.CustomerId);
            return View(order);
        }

        // POST: Orders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
