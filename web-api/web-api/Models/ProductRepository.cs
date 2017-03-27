using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_api.Models
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductContext _context;

        public ProductRepository(ProductContext context)
        {
            _context = context;
            Add(new ProductItem
            {
                productName = "Leaf Rake",
                productCode = "GDN-001",
                releaseDate = new DateTime(2016, 03, 19),
                desciption = "Leaf rake with 48-inch wooden handle.",
                price = 19.95,
                starRating = (decimal)3.2,
                imageUrl = "https://www.nature-watch.com/images/products/large/279k%20new.jpg",
                tags = string.Join(",", "rake", "leaf", "yard", "home")
            });
            Add(new ProductItem
            {
                productName = "Garden Cart",
                productCode = "GDN-002",
                releaseDate = new DateTime(2016, 03, 18),
                desciption = "15 gallon capacity rolling garden cart.",
                price = 32.99,
                starRating = (decimal)4.2,
                imageUrl = "http://www.eurocosm.com/Application/images/garden-carts/garden-cart-lg.jpg",
                tags = string.Join(",", "rake", "leaf", "yard", "home")
            });
            Add(new ProductItem
            {
                productName = "Hammer",
                productCode = "GDN-003",
                releaseDate = new DateTime(2016, 05, 21),
                desciption = "Curved claw steel hammer.",
                price = 8.9,
                starRating = (decimal)4.8,
                imageUrl = "http://s.hswstatic.com/gif/hammer-1.jpg",
                tags = string.Join(",", "rake", "leaf", "yard", "home")
            });
            Add(new ProductItem
            {
                productName = "Saw",
                productCode = "GDN-004",
                releaseDate = new DateTime(2016, 05, 15),
                desciption = "15-inch steel blade hand saw.",
                price = 11.55,
                starRating = (decimal)3.7,
                imageUrl = "https://dict.meemodel.com/image_word/61448.jpg",
                tags = string.Join(",", "rake", "leaf", "yard", "home")
            });
            Add(new ProductItem
            {
                productName = "Video Game Controller",
                productCode = "GDN-005",
                releaseDate = new DateTime(2016, 10, 15),
                desciption = "Standard two-button video game controller.",
                price = 35.95,
                starRating = (decimal)4.6,
                imageUrl = "http://www.videogameconsolelibrary.com/images/articles/dw-game_controllers/contr-wire2-360-1.jpg",
                tags = string.Join(",", "rake", "leaf", "yard", "home")
            });
        }

        public IEnumerable<ProductItem> GetAll()
        {
            return _context.ProductItems.ToList();
        }

        public ProductItem Find(int id)
        {
            return _context.ProductItems.FirstOrDefault(p => p.id == id);
        }

        public void Add(ProductItem item)
        {
            _context.ProductItems.Add(item);
            _context.SaveChanges();
        }

        public void Update(ProductItem item)
        {
            _context.ProductItems.Update(item);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
            var entity = _context.ProductItems.First(p => p.id == id);
            _context.ProductItems.Remove(entity);
            _context.SaveChanges();
        }        
    }
}
