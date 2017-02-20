import { PipeTransform, Pipe } from '@angular/core';

import { IProduct } from './product';

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform{

    transform(value: IProduct[], filterBy: string, rating: number): IProduct[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        value = filterBy ? value.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
        if(rating){
            let minimum: number = rating;
            let maximum: number = rating + 0.9;
            value = value.filter((product: IProduct) => product.starRating >= minimum && product.starRating <= maximum);       
        }
        return value;
    }
}