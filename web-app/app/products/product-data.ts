import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product';

export class ProductData implements InMemoryDbService {
    createDb() {
        let products: IProduct[] = [
            {
                "id": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-0011",
                "releaseDate": "2016-03-19T00:00:00.000z",
                "description": "Leaf rake with 48-inch wooden handle.",
                "price": 19.95,
                "starRating": 3.2,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png",
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                "id": 2,
                "productName": "Garden Cart",
                "productCode": "GDN-0023",
                "releaseDate": "2016-03-18T00:00:00.000z",
                "description": "15 gallon capacity rolling garden cart",
                "price": 32.99,
                "starRating": 4.2,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png",
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                "id": 5,
                "productName": "Hammer",
                "productCode": "TBX-0048",
                "releaseDate": "2016-05-21T00:00:00.000z",
                "description": "Curved claw steel hammer",
                "price": 8.9,
                "starRating": 4.8,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png",
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                "id": 8,
                "productName": "Saw",
                "productCode": "TBX-0022",
                "releaseDate": "2016-05-15T00:00:00.000z",
                "description": "15-inch steel blade hand saw",
                "price": 11.55,
                "starRating": 3.7,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png",
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                "id": 10,
                "productName": "Video Game Controller",
                "productCode": "GMG-0042",
                "releaseDate": "2015-10-15T00:00:00.000z",
                "description": "Standard two-button video game controller",
                "price": 35.95,
                "starRating": 4.6,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png",
                'tags': ['rake', 'leaf', 'yard', 'home']
            }
        ];
        return {products};
    }
}