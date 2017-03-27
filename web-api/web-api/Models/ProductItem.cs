using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_api.Models
{
    public class ProductItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string productName { get; set; }
        public string productCode { get; set; }
        public DateTime releaseDate { get; set; }
        public string desciption { get; set; }
        public double price { get; set; }
        public decimal starRating { get; set; }
        public string imageUrl { get; set; }
        public string tags { get; set; }
    }
}
