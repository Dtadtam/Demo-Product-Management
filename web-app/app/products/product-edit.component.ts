import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, FormControlName, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';

@Component({
    templateUrl: './app/products/product-edit.component.html'
})

export class ProductEditComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product Edit';
    errorMessage: string;
    productForm: FormGroup;
    product: IProduct;
    private sub: Subscription;
    productNameMessage: string;
    productCodeMessage: string;
    ratingMessage: string

    // Use with the generic validation message class
    displayMessage: {[key: string]: string} = {};
    private validationMessage: { [key: string]: { [key: string]: string } };

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private ProductService: ProductService) {

    }

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([this.buildTag('')]),
            description: ''
        });

        // read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id)
            }
        );

        const productNameControl = this.productForm.get('productName');
        productNameControl.valueChanges.subscribe(value => this.setProductNameMessage(productNameControl))

        const productCodeControl = this.productForm.get('productCode');
        productCodeControl.valueChanges.subscribe(value => this.setProductCodeMessage(productCodeControl));

        const starRatingControl = this.productForm.get('starRating');
        starRatingControl.valueChanges.subscribe(value => this.setStarRatingMessage(starRatingControl));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getProduct(id: number): void {
        this.ProductService.getProductById(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    addTag(): void {
        this.tags.push(this.buildTag(''));
    }

    buildTag(value: string): FormGroup {
        return this.fb.group({ tag: [value, Validators.required] });
    }

    private ValidationMessages = {
        required: 'Please enter value in this field',
        minlength: 'Please enter more letter',
        maxlength: 'Please delete some letter',
        range: 'Please enter value in the range'
    }

    setProductNameMessage(control: AbstractControl) {
        this.productNameMessage = this.getMessage(control);
    }
    
    setProductCodeMessage(control: AbstractControl) {
        this.productCodeMessage = this.getMessage(control);
    }

    setStarRatingMessage(control: AbstractControl) {
        this.ratingMessage = this.getMessage(control);
    }

    getMessage(control: AbstractControl): string {
        if((control.dirty || control.touched) && control.errors) {
            return Object.keys(control.errors).map(key => 
                this.ValidationMessages[key]).join(' ');
        }
        else return '';
    }

    onProductRetrieved(product: IProduct): void {
        if(this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        if(this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }

        // Update the data on the form
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array([]));
        
        for (let value of this.product.tags.split(',')) {
            if (value) {
                this.tags.push(this.buildTag(value));
            }
        }
    }

    deleteProduct(): void {
        if(this.product.id === 0){
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm(`Really delete the product: ${this.product.productName}`)) {
                this.ProductService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.productForm.dirty && this.productForm.valid) {
            // Copy the form values over the product object values
            let p = Object.assign({}, this.product, this.productForm.value);
            let tags = new Array();
            for (let obj of this.tags.value) {
                tags.push(obj.tag);
            }
            p.tags =  tags.join(',');
            console.log(p);
            this.ProductService.saveProduct(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        }
        else if (!this.productForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}