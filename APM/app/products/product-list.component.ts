import { Component, OnInit } from '@angular/core';

import { IProduct } from './product'
import { ProductService } from './product.service';

@Component({
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    // styles: ['thead{ color: #337AB7;}'],
    styleUrls:['product-list.component.css'],
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage:Boolean = false;
    listRating: number[] = [1, 2, 3, 4, 5];
    listFilter: string;
    ratingFilter: number;
    sortor: string;
    operator: string;
    errorMessage: string;

    products: IProduct[];

    constructor (private _productService: ProductService){

    }

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit():void{
        this._productService.getProducts()
            .subscribe(products => this.products = products,
                error => this.errorMessage = <any>error); 
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = `Product List: The rating ` + message + ` was clicked!`;
    }

    onRatingFilterChange(event: MouseEvent, ratingNumber:number):void {
        this.ratingFilter = ratingNumber;
        event.preventDefault();
    }
}