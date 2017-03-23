"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/merge");
var product_service_1 = require("./product.service");
var number_validator_1 = require("../shared/number.validator");
var ProductEditComponent = (function () {
    function ProductEditComponent(fb, route, ProductService) {
        this.fb = fb;
        this.route = route;
        this.ProductService = ProductService;
        this.pageTitle = 'Product Edit';
        // Use with the generic validation message class
        this.displayMessage = {};
        this.ValidationMessages = {
            required: 'Please enter value in this field',
            minlength: 'Please enter more letter',
            maxlength: 'Please delete some letter',
            range: 'Please enter value in the range'
        };
    }
    Object.defineProperty(ProductEditComponent.prototype, "tags", {
        get: function () {
            return this.productForm.get('tags');
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productForm = this.fb.group({
            productName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            productCode: ['', forms_1.Validators.required],
            starRating: ['', number_validator_1.NumberValidators.range(1, 5)],
            tags: this.fb.array([this.buildTag('')]),
            description: ''
        });
        // read the product Id from the route parameter
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getProduct(id);
        });
        var productNameControl = this.productForm.get('productName');
        productNameControl.valueChanges.subscribe(function (value) { return _this.setProductNameMessage(productNameControl); });
        var productCodeControl = this.productForm.get('productCode');
        productCodeControl.valueChanges.subscribe(function (value) { return _this.setProductCodeMessage(productCodeControl); });
        var starRatingControl = this.productForm.get('starRating');
        starRatingControl.valueChanges.subscribe(function (value) { return _this.setStarRatingMessage(starRatingControl); });
    };
    ProductEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductEditComponent.prototype.ngAfterViewInit = function () {
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.ProductService.getProductById(id)
            .subscribe(function (product) { return _this.onProductRetrieved(product); }, function (error) { return _this.errorMessage = error; });
    };
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(this.buildTag(''));
    };
    ProductEditComponent.prototype.buildTag = function (value) {
        return this.fb.group({ tag: [value, forms_1.Validators.required] });
    };
    ProductEditComponent.prototype.setProductNameMessage = function (control) {
        this.productNameMessage = this.getMessage(control);
    };
    ProductEditComponent.prototype.setProductCodeMessage = function (control) {
        this.productCodeMessage = this.getMessage(control);
    };
    ProductEditComponent.prototype.setStarRatingMessage = function (control) {
        this.ratingMessage = this.getMessage(control);
    };
    ProductEditComponent.prototype.setTagMessage = function (control, errorControl) {
        errorControl.value = this.getMessage(control);
    };
    ProductEditComponent.prototype.getMessage = function (control) {
        var _this = this;
        if ((control.dirty || control.touched) && control.errors) {
            return Object.keys(control.errors).map(function (key) {
                return _this.ValidationMessages[key];
            }).join(' ');
        }
        else
            return '';
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
        // Update the data on the form
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array([]));
        for (var _i = 0, _a = this.product.tags; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value) {
                this.tags.push(this.buildTag(value));
            }
        }
    };
    return ProductEditComponent;
}());
__decorate([
    core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }),
    __metadata("design:type", Array)
], ProductEditComponent.prototype, "formInputElements", void 0);
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-edit.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, product_service_1.ProductService])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map