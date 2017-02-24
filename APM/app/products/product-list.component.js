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
var core_1 = require("@angular/core");
var product_service_1 = require("./product.service");
var ProductListComponent = (function () {
    function ProductListComponent(_productService) {
        this._productService = _productService;
        this.pageTitle = 'Product List';
        this.imageWidth = 50;
        this.imageMargin = 2;
        this.showImage = false;
        this.listRating = [1, 2, 3, 4, 5];
    }
    Object.defineProperty(ProductListComponent.prototype, "codeGlyphicon", {
        get: function () {
            var glyphicon = 'glyphicon-triangle-bottom';
            if (this.sortor === 'code' && this.operator === 'DESC')
                glyphicon = 'glyphicon-triangle-top';
            return glyphicon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductListComponent.prototype, "avaliableGlyphicon", {
        get: function () {
            var glyphicon = 'glyphicon-triangle-bottom';
            if (this.sortor === 'avaliable' && this.operator === 'DESC')
                glyphicon = 'glyphicon-triangle-top';
            return glyphicon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductListComponent.prototype, "priceGlyphicon", {
        get: function () {
            var glyphicon = 'glyphicon-triangle-bottom';
            if (this.sortor === 'price' && this.operator === 'DESC')
                glyphicon = 'glyphicon-triangle-top';
            return glyphicon;
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.toggleImage = function () {
        this.showImage = !this.showImage;
    };
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._productService.getProducts()
            .subscribe(function (products) { return _this.products = products; }, function (error) { return _this.errorMessage = error; });
    };
    ProductListComponent.prototype.onRatingClicked = function (message) {
        this.pageTitle = "Product List: The rating " + message + " was clicked!";
    };
    ProductListComponent.prototype.onRatingFilterChange = function (ratingNumber) {
        this.ratingFilter = ratingNumber;
    };
    ProductListComponent.prototype.onProductSorterChange = function (sorter) {
        if (this.sortor === sorter)
            this.operator = this.manageOperator(this.operator);
        else {
            this.sortor = sorter;
            this.operator = 'ASC';
        }
    };
    ProductListComponent.prototype.manageGlyphicon = function (sorter) {
        var glyphicon = 'glyphicon-triangle-bottom';
        if (this.sortor === sorter && this.operator === 'DESC')
            glyphicon = 'glyphicon-triangle-top';
        return glyphicon;
    };
    ProductListComponent.prototype.manageOperator = function (operator) {
        return operator === "ASC" ? "DESC" : "ASC";
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'product-list.component.html',
        // styles: ['thead{ color: #337AB7;}'],
        styleUrls: ['product-list.component.css'],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map