import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

if (ENV !== 'production') {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
