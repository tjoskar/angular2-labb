import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode } from 'angular2/core';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.component';
import libProviders from './lib/providers';


function main() {
    return bootstrap(AppComponent, [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        ...libProviders
    ])
    .then(() => '🦄')
    .catch(err => console.error(err));
}

function bootstrapDomReady() {
    return document.addEventListener('DOMContentLoaded', main);
}

if (ENV === 'development') {
    // Is "hot module reload" activated?
    if (HMR) {
        if (document.readyState === 'complete') {
            main();
            console.clear();
        } else {
            bootstrapDomReady();
        }
        module.hot.accept();
    } else {
        bootstrapDomReady();
    }
} else {
    enableProdMode();
    bootstrapDomReady();
}
