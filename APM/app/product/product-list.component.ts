import { Component, OnInit } from '@angular/core';

import { IProduct } from './product'
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    // styles: ['thead{ color: #337AB7;}'],
    styleUrls:['product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage = false;
    listFilter: string;
    products: IProduct[];

    constructor (private _productService: ProductService){

    }

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit():void{
        this.products = this._productService.getProducts(); 
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = 'Product List: ' + message;
    }
}