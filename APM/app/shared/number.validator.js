"use strict";
var NumberValidators = (function () {
    function NumberValidators() {
    }
    NumberValidators.rage = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'rage': true };
            }
            return null;
        };
    };
    return NumberValidators;
}());
exports.NumberValidators = NumberValidators;
//# sourceMappingURL=number.validator.js.map