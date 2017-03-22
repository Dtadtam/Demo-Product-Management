import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
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
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './app/products/product-edit.component.html'
})

export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

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
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {

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
            tags: this.fb.array([this.buildTag()]),
            description: ''
        });

        // read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProductId(id)
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

    ngAfterViewInit(): void{

    }

    getProductId(id: number): IProduct {
        return null;
    }

    addTag(): void {
        this.tags.push(this.buildTag());
    }

    buildTag(): FormGroup {
        return this.fb.group({ tag: ['', Validators.required] });
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

    setTagMessage(control: AbstractControl, errorControl: AbstractControl) {
        errorControl.value = this.getMessage(control);
    }

    getMessage(control: AbstractControl): string {
        if((control.dirty || control.touched) && control.errors) {
            return Object.keys(control.errors).map(key => 
                this.ValidationMessages[key]).join(' ');
        }
        else return '';
    }
}