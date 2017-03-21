import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
    templateUrl: 'app/products/product-edit.component.html'
})

export class ProductEditComponent implements OnInit {
    productForm: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', ],
            tags: this.fb.array([]),
            description: ''
        });
    }

}