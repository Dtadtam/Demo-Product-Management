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
var router_1 = require("@angular/router");
var ProductDetailGuard = (function () {
    function ProductDetailGuard(_router) {
        this._router = _router;
    }
    ProductDetailGuard.prototype.canActivate = function (route) {
        var id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            // start a new navigation to redirect to list page
            this._router.navigate(['/products']);
            // abort currect navigation
            return false;
        }
        return true;
    };
    return ProductDetailGuard;
}());
ProductDetailGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], ProductDetailGuard);
exports.ProductDetailGuard = ProductDetailGuard;
var ProductEditGuard = (function () {
    function ProductEditGuard(router) {
        this.router = router;
    }
    ProductEditGuard.prototype.canActivate = function (route) {
        var id = Number(route.url[1].path);
        if (isNaN(id) || id < 0) {
            alert('Invalid product id');
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    };
    ProductEditGuard.prototype.canDeactivate = function (component) {
        if (component.productForm.dirty) {
            var productName = component.productForm.get('productName').value || 'New Product';
            return confirm("Navigate away and lose all changes to " + productName + "?");
        }
        return true;
    };
    return ProductEditGuard;
}());
ProductEditGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], ProductEditGuard);
exports.ProductEditGuard = ProductEditGuard;
//# sourceMappingURL=product-guard.services.js.map