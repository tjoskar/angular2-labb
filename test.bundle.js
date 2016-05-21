// Include all modules that we need to execute the test cases

Error.stackTraceLimit = Infinity;

require('phantomjs-polyfill');

require('es6-shim');
require('reflect-metadata');
require('rxjs');

require('zone.js/dist/zone-microtask.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/jasmine-patch.js');

var testing = require('@angular/core/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS
);

// Require all modules ending in ".test" from the
// current directory and all subdirectories
var testContext = require.context('./src', true, /\.test\.ts/);

// For each module, call the context function
// that will require the file and load it up here.
testContext.keys().forEach(testContext);
