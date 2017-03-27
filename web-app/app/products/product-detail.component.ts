import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    styleUrls: ['app/products/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    pageTitle: string;
    product: IProduct;
    errorMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _productService: ProductService){

    }

    ngOnInit():void {
        let id = +this._route.snapshot.params['id'];
        this.sub = this._route.params.subscribe(
            params => {
                this._productService.getProductById(id)
                .subscribe(
                    value => {
                        this.product = value;
                        this.pageTitle = 'Product Detail : ' + this.product.productName;
                        // this.product.productName = 'test';
                    },
                    error => this.errorMessage = <any>error
                    // () => {this.errorMessage = "<any>error"}
                );
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string) {
        this.pageTitle = 'Product Detail : ' + this.product.productName + ' (Rating '+ message +')';
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
}