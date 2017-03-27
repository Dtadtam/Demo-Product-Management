using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using web_api.Models;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace web_api.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productReopsitory)
        {
            _productRepository = productReopsitory;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ProductItem> Get()
        {
            return _productRepository.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}", Name ="GetProduct")]
        public IActionResult Get(int id)
        {
            var item = _productRepository.Find(id);
            if(item == null)
            {
                return NotFound();
            }

            return new ObjectResult(item);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]ProductItem item)
        {
            if(item == null)
            {
                return BadRequest();
            }

            _productRepository.Add(item);

            return CreatedAtRoute("GetProduct", new { id = item.id }, item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ProductItem item)
        {
            if(item == null || item.id != id)
            {
                return BadRequest();
            }

            var product = _productRepository.Find(id);
            if(product == null)
            {
                return NotFound();
            }

            UpdateProductEntity(product, item);
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _productRepository.Find(id);
            if(product == null)
            {
                return NotFound();
            }

            _productRepository.Remove(id);
            return new NoContentResult();
        }

        private void UpdateProductEntity(ProductItem dbItem, ProductItem formItem)
        {
            dbItem.productName = formItem.productName;
            dbItem.productCode = formItem.productCode;
            dbItem.releaseDate = formItem.releaseDate;
            dbItem.description = formItem.description;
            dbItem.price = formItem.price;
            dbItem.starRating = formItem.starRating;
            dbItem.imageUrl = formItem.imageUrl;
            dbItem.tags = formItem.tags;

            _productRepository.Update(dbItem);
        }
    }
}
