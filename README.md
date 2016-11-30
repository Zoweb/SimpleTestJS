# SimpleTestJS
**A simple, lightweight JavaScript testing library**

*SimpleTestJS* is a tiny testing library, that comes with a few extra features.

To use, just include `/dist/simple-test-js.js` of the version you wish (the files end with the version number) into your page:

    <script src="/path/to/simple-test-js.js"></script>

And create your test:

    let mainTest = $ === jQuery,
	otherTestsAsArray = [
	    { name: "properValue", $("body") === jQuery("body") }
	]
    let testResult = test.result(mainTest, otherTestsAsArray);
    console.log(testResult); // { properValue: true }

The tests can output `false` (or an empty object if the third argument is `true`) if the main test does not complete, or an object of the other tests and if they completed or not.

## Want to build it yourself?
Check out the /build/README.md file.
