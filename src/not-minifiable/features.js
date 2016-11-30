/**
 * Feature tester
 * @param {string} feature The feature to be testing for
 * @param {boolean} [forceObj] Force return value to be an object
 */
test.feature = function(feature, forceObj) {
    function returnValue(val) {
        return val || (forceObj ? {} : false);
    }

    if (feature === "class") {
        try {

            // Empty class test
            class EmptyClass {

            }

            // Class with contents test
            class FullClass {
                // Constructor test
                constructor() {

                }

                // Prototype test 1
                proto() {
                    return true;
                }

                // Prototype test 2
                proto2(value) {
                    return value;
                }
            }

            return returnValue(test.result(typeof EmptyClass === "function", [
                { name: "constructor", check: new FullClass() instanceof FullClass },
                { name: "proto", check: new FullClass().proto() === true },
                { name: "protoWithValue", check: new FullClass().proto2("test") === "test" }
            ]));
        } catch (e) {
            return returnValue();
        }
    }

    if (feature === "template literal") {
        try {
            var
                // Basic test
                basic = `basic`,

                // Multiline test
                multi = `multi
line`,

                // Template test
                template = `${"template"}`;

            return returnValue(test.result(basic === "basic", [
                { name: "multiline", check: multi === "multi\nline" },
                { name: "template", check: template === "template" }
            ]));
        } catch (e) {
            return returnValue();
        }
    }

    if (feature === "variable initializer") {
        var letValueOuter, constValueOuter;
        try {
            // Let test
            let letValue = "value"; letValueOuter = letValue;
        } catch (e) {
            letValueOuter = "false";
        }
        try {
            // Const test
            const constValue = "value";
            constValueOuter = constValue;
        } catch (e) {
            constValueOuter = "false";
        }

        return returnValue(test.result(true, [
            { name: "let", check: letValueOuter === "value" },
            { name: "const", check: constValueOuter === "value" }
        ]));
    }
};