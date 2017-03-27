using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_api.Models
{
    public interface IProductRepository
    {
        IEnumerable<ProductItem> GetAll();
        ProductItem Find(int id);
        void Add(ProductItem item);
        void Update(ProductItem item);
        void Remove(int id);
    }
}
