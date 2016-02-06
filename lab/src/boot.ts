import 'es6-shim';
import 'reflect-metadata';
import 'rxjs';
import 'zone.js/dist/zone-microtask';
import 'zone.js/dist/long-stack-trace-zone';
import 'bootstrap/dist/css/bootstrap.min.css';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS
]);
