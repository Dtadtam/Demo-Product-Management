// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { productSorterPipe } from './product-sorter.pipe';
import { ProductService } from './product.service';
import { ProductRoutingModule } from './product-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(ProductData),
        ProductRoutingModule
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductFilterPipe,
        productSorterPipe
    ],
    providers: [
        ProductService
    ]
})

export class ProductModule {}