/*!
 * SimpleTestJS JavaScript Library v{{version}}
 * https://github.com/zoweb/SimpleTestJS
 *
 * Copyright zoweb and other contributors
 * Released under the MIT license
 * https://raw.githubusercontent.com/Zoweb/SimpleTestJS/master/LICENSE
 *
 * Compiled {{date}}
 */

(function(global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    var version = "{{version}}",
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

{{content}}

    if (noGlobal) {
        return test;
    } else {
        window.test = test;
    }
});