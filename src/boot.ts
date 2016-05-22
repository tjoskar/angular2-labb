import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import LIB_PROVIDERS from './lib/providers';

function main() {
    return bootstrap(AppComponent, [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        LIB_PROVIDERS
    ])
    .then(() => '🦄')
    .catch(err => console.error(err));
}

function bootstrapDomReady() {
    return document.addEventListener('DOMContentLoaded', main);
}

if (ENV === 'development' && HMR === true) {
    // activate hot module reload
    if (document.readyState === 'complete') {
        console.clear();
        main();
    } else {
        bootstrapDomReady();
    }
    module.hot.accept();
} else {
    enableProdMode();
    bootstrapDomReady();
}
