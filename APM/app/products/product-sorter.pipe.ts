import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'productSorter'
})

export class productSorterPipe implements PipeTransform {
    
    transform(value: IProduct[], soter: string, operator: string): IProduct[]{
        
        return value;
    }

}