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
    
    errorMessage: string;

    products: IProduct[];

    sortor: string;
    operator: string;

    get codeGlyphicon():string {
        let glyphicon: string = 'glyphicon-triangle-bottom';
        if(this.sortor === 'code' && this.operator === 'DESC')
            glyphicon = 'glyphicon-triangle-top';

        return glyphicon;
    }

    get avaliableGlyphicon():string {
        let glyphicon: string = 'glyphicon-triangle-bottom';
        if(this.sortor === 'avaliable' && this.operator === 'DESC')
            glyphicon = 'glyphicon-triangle-top';

        return glyphicon;
    }

    get priceGlyphicon():string {
        let glyphicon: string = 'glyphicon-triangle-bottom';
        if(this.sortor === 'price' && this.operator === 'DESC')
            glyphicon = 'glyphicon-triangle-top';
        
        return glyphicon;
    }

    constructor (private _productService: ProductService) {
        
    }

    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit():void {
        this._productService.getProducts()
            .subscribe(products => this.products = products,
                error => this.errorMessage = <any>error); 
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = `Product List: The rating ` + message + ` was clicked!`;
    }

    onRatingFilterChange(ratingNumber:number):void {
        this.ratingFilter = ratingNumber;
    }

    onProductSorterChange(sorter:string) {
        if(this.sortor === sorter)
            this.operator = this.manageOperator(this.operator);
        else{
            this.sortor = sorter;
            this.operator = 'ASC';
        }
    }

    manageGlyphicon(sorter: string): string {
        let glyphicon: string = 'glyphicon-triangle-bottom';
        if(this.sortor === sorter && this.operator === 'DESC')
            glyphicon = 'glyphicon-triangle-top';

        return glyphicon;
    }

    convertReleaseDate(date: string): string {
        let objDate:Date = new Date(date); 
        let monthNames:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return objDate.getDate() + ' ' + monthNames[objDate.getMonth()] + ' ' + objDate.getFullYear();
    }

    private manageOperator(operator: string): string
    {
        return operator === "ASC" ? "DESC" : "ASC";
    }
}