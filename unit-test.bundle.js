// Include all modules that we need to execute the test cases

Error.stackTraceLimit = Infinity;

require('es6-shim');
require('reflect-metadata');
require('rxjs/Rx');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

Object.assign(
    global,
    testing,
    {
        ENV: 'development',
        HMR: false
    }
);

// Require all modules ending with ".test" from the
// current directory and all subdirectories
const testContext = require.context('./src', true, /\.test\.ts/);

// For each module, call the context function
// that will require the file and load it up here.
testContext.keys().forEach(testContext);
