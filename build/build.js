/**
 * @licence
 * @license
 * Copyright (c) 2016, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

/*  ---  Build Script  ---  */

// Requires ES6
const mustache = require("mustache"), fs = require("fs"), UglifyJS = require("uglify-js");

mustache.escape = value => value;

const version = "1.0.0";

const rootDir = __dirname + "/../src";

let files = {
    container: "container.js",
    src: [
        "test.js"
    ],
    out: {
        dev: `simple-test-js-v${version}.js`,
        min: `simple-test-js-v${version}.min.js`
    }
};

function toPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(resolve, reject);
    });
}

fs.readFile(`${rootDir}/container/${files.container}`, {encoding: 'utf-8'}, function(err, containerData) {
    if (err) {
        throw new Error(err);
    }

    let srcFilesLength = files.src.length, promises = [];
    for (let i = 0; i < srcFilesLength; i++) {
        promises.push(toPromise(function(resolve, reject) {
            fs.readFile(`${rootDir}/main/${files.src[i]}`, {encoding: 'utf-8'}, function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        }));
    }

    Promise.all(promises).then(function() {
        let textContent = "";
        /*for (let argNum = 0; argNum < arguments.length; argNum++) {
            let arg = arguments[argNum];
            textContent += arg;
            console.log(arg);
        }*/
        textContent = arguments[0].join('\r\n\r\n');

        let outputData = mustache.render(containerData, {
            version: version,
            content: textContent,
            date: (new Date()).toISOString()
        });
        fs.open(`${rootDir}/../dist/${files.out.dev}`, 'w', function(err, fd) {
            fs.writeFile(`${rootDir}/../dist/${files.out.dev}`, outputData, function(err) {
                if (err) {
                    throw new Error(err);
                }

                console.info("Saved development distribution file");
            });
        });
        fs.open(`${rootDir}/../dist/${files.out.min}`, 'w', function(err, fd) {
            let miniData = UglifyJS.minify(outputData, {
                fromString: true,

                compress: {
                    dead_code: true,
                    global_defs: {
                        DEBUG: false
                    }
                },

                output: {
                    comments: /^!/
                }
            });
            fs.writeFile(`${rootDir}/../dist/${files.out.min}`, miniData.code, function(err) {
                if (err) {
                    throw new Error(err);
                }

                console.info("Saved minified distribution file");
            });
        });
    }).catch(function(err) {
        console.error(err);
    });
});
