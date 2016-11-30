/*!
 * SimpleTestJS JavaScript Library v1.0.0
 * https://github.com/zoweb/SimpleTestJS
 *
 * Copyright zoweb and other contributors
 * Released under the MIT license
 * https://raw.githubusercontent.com/Zoweb/SimpleTestJS/master/LICENSE
 *
 * Compiled 2016-11-30T03:57:17.382Z
 */

(function(global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    var version = "1.0.0",
        test = {};

    var priv = {
        extend: function(obj1, obj2) {
            return Object.assign(obj1, obj2);
        },
        val: function(obj2) {
            return Object.assign(priv, obj2);
        },
        each: function(obj, fn, deep) {
            function loop(obj) {
                for (var inner in obj) {
                    if (obj.hasOwnProperty(inner)) {
                        var innerObj = obj[inner];
                        if (typeof innerObj === "object" && deep) {
                            loop(innerObj);
                        } else {
                            fn.call(innerObj, Object.keys(obj).indexOf(inner), innerObj);
                        }
                    }
                }
            }
        }
    };

/**
 * If mainTest, tests that all otherTests match the wanted value
 * @param {boolean} mainTest The main test to complete
 * @param {object} [otherTests] Any other tests to complete
 */
test.result = function(mainTest, otherTests) {
    if (mainTest) {
        if (otherTests instanceof Array && otherTests.length > 0) {
            // We can't use `let` as we may not be parsed as ES6.
            var returnValue = {};
            otherTests.forEach(function(curr) {
                returnValue[curr.name] = curr.check;
            });
            return returnValue;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

    if (noGlobal) {
        return test;
    } else {
        window.test = test;
    }
});