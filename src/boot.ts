import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
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
