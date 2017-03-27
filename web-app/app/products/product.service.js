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
        // Web API Port
        this.baseUrl = 'http://localhost:52768/api/products';
    }
    // Get all product(s)
    ProductService.prototype.getProducts = function () {
        return this.http.get("" + this.baseUrl)
            .map(this.extractData)
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Get product by id
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
    // Delete product 
    ProductService.prototype.deleteProduct = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, options)
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Gate way to create or update product
    ProductService.prototype.saveProduct = function (product) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (product.id === 0) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    };
    // Create product
    ProductService.prototype.createProduct = function (product, options) {
        console.log(product);
        return this.http.post(this.baseUrl, product, options)
            .map(this.extractData)
            .do(function (data) { return console.log('createProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Update product
    ProductService.prototype.updateProduct = function (product, options) {
        var url = this.baseUrl + "/" + product.id;
        return this.http.put(url, product, options)
            .map(function () { return product; })
            .do(function (data) { return console.log('updateProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // Function to extract data when web-api response something
    ProductService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    // Return error when request or response has a crash
    ProductService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    // To initializa product when staying in create mode
    ProductService.prototype.initializaProduct = function () {
        return {
            id: 0,
            productName: '',
            productCode: '',
            tags: '',
            price: 0,
            releaseDate: new Date().toLocaleDateString(),
            description: '',
            starRating: 0,
            imageUrl: ''
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