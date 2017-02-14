import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-guard.services';

@NgModule({
    imports:[
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'ProductDetail/:id', canActivate: [ ProductDetailGuard ], 
                component: ProductDetailComponent }
        ])
    ],
    exports:[ RouterModule ],
    providers: [ ProductDetailGuard ]
})

export class ProductRoutingModule {

};