import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'productSorter'
})

export class productSorterPipe implements PipeTransform {
    
    transform(value: IProduct[], sorter: string, operator: string): IProduct[]{
        switch (sorter) {
            case 'product':
                value.sort(function(a, b) {
                    if(a.productName < b.productName) {
                        return operator === 'ASC' ? -1 : 1;   
                    }
                    else if(a.productName > b.productName) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'code':
                value.sort(function(a, b) {
                    if(a.productCode < b.productCode) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if(a.productCode > b.productCode) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'available':
                value.sort(function(a, b) {
                    if(a.releaseDate < b.releaseDate) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if(a.releaseDate > b.releaseDate) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'price':
                value.sort(function(a, b) {
                    if(a.price < b.price) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if(a.price > b.price) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'rating':
                value.sort(function(a, b) {
                    if(a.starRating < b.starRating) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if(a.starRating > b.starRating) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
        }
        return value;
    }

}