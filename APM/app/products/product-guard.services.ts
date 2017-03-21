import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

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

export class ProductEditGuard implements CanActivate {
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
}