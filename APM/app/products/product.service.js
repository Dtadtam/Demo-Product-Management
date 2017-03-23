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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        //private productUrl = 'api/products/products.json';
        this.baseUrl = 'api/products';
    }
    ProductService.prototype.getProducts = function () {
        return this.http.get("" + this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getProductById = function (id) {
        var _this = this;
        if (id === 0) {
            return Observable_1.Observable.create(function (observer) {
                observer.next(_this.initializaProduct());
                observer.complete();
            });
        }
        var url = this.baseUrl + "/" + id;
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log('getProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (id) {
        return null;
    };
    ProductService.prototype.saveProduct = function (product) {
        return null;
    };
    ProductService.prototype.extractData = function (response) {
        var body = response.json();
        return body.data || {};
    };
    ProductService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ProductService.prototype.initializaProduct = function () {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            price: null,
            releaseDate: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map