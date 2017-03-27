import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if(isNaN(id) || id < 1){
            alert('Invalid product Id');
            // start a new navigation to redirect to list page
            this._router.navigate(['/products']);
            // abort currect navigation
            return false;
        }
        return true;
    }
}

@Injectable()
export class ProductEditGuard implements CanActivate, CanDeactivate<ProductEditComponent> {
    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) : boolean {
        let id = Number(route.url[1].path);
        if(isNaN(id) || id < 0) {
            alert('Invalid product id');
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    }

    canDeactivate(component: ProductEditComponent): boolean {
        if(component.productForm.dirty) {
            let productName = component.productForm.get('productName').value || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}