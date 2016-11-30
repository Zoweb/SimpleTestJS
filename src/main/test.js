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