"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var productSorterPipe = (function () {
    function productSorterPipe() {
    }
    productSorterPipe.prototype.transform = function (value, sorter, operator) {
        switch (sorter) {
            case 'product':
                value.sort(function (a, b) {
                    if (a.productName < b.productName) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if (a.productName > b.productName) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'code':
                value.sort(function (a, b) {
                    if (a.productCode < b.productCode) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if (a.productCode > b.productCode) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'available':
                value.sort(function (a, b) {
                    if (a.releaseDate < b.releaseDate) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if (a.releaseDate > b.releaseDate) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'price':
                value.sort(function (a, b) {
                    if (a.price < b.price) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if (a.price > b.price) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
            case 'rating':
                value.sort(function (a, b) {
                    if (a.starRating < b.starRating) {
                        return operator === 'ASC' ? -1 : 1;
                    }
                    else if (a.starRating > b.starRating) {
                        return operator === 'ASC' ? 1 : -1;
                    }
                    return 0;
                });
                break;
        }
        return value;
    };
    return productSorterPipe;
}());
productSorterPipe = __decorate([
    core_1.Pipe({
        name: 'productSorter'
    })
], productSorterPipe);
exports.productSorterPipe = productSorterPipe;
//# sourceMappingURL=product-sorter.pipe.js.map